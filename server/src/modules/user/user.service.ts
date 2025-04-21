import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool, runSql } from '../../config/database';
import { CustomError } from '../../error/errorClasses';
import { baseImageUrl } from '../../utils/helperFuncs';

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

/**
 * Authenticates a user by checking if the provided email exists and verifying the password.
 * If successful, a JWT token is generated and returned alongside user data (excluding the password).
 *
 * @param {LoginUser} body - An object containing the user's email and password.
 *
 * @returns {Promise<{ message: string, data: Omit<RegisterUser, 'password'>, token: string }>}
 * An object containing a success message, user data (without password), and a JWT token.
 *
 * @throws {EmailError} If the provided email does not exist in the database.
 * @throws {PasswordError} If the provided password does not match the stored password.
 * @throws {PostgreSQLError} If a database error occurs while checking the user or retrieving data.
 */

export async function loginUser(body: LoginUser) {
    const { email, password } = body;

    // Check if the email is valid
    const query_user = `SELECT id, username, email, password FROM users WHERE email = $1;`;
    const user = await runSql<RegisterUser>(pool, query_user, [email.toLowerCase()]);

    if (!user || user.length === 0) {
        throw new CustomError.EmailError('Invalid email.');
    }

    // Compare the password against the hashed password.
    const passwordIsMatching = await bcrypt.compare(password, user[0].password);

    if (!passwordIsMatching) {
        throw new CustomError.PasswordError('Invalid password.');
    }

    // Generate a JWT token
    const id: number = user[0].id;
    const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: '1h' });
    const { password: _, id: __, ...data } = user[0];

    return {
        message: 'Successfully signed in.',
        data,
        token,
    };
}

/**
 * Registers a new user by first checking if the email already exists in the database.
 * If the user does not exist, their data is inserted with a hashed password.
 *
 * The operation is wrapped in a transaction to ensure data consistency.
 *
 * @param {RegisterUser} body - An object containing the user's username, email, and raw password.
 *
 * @returns {Promise<void>} - Resolves when the user has been successfully registered.
 *
 * @throws {EmailError} If a user with the provided email already exists.
 * @throws {PostgreSQLError} If a database error occurs during the operation.
 */

export async function registerUser(body: RegisterUser) {
    const { username, email, password } = body;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const query_find_user = `SELECT email FROM users WHERE email = $1;`;
        const user = await runSql<{ email: string } | undefined>(client, query_find_user, [
            email.toLowerCase(),
        ]);

        if (user && user.length > 0) {
            throw new CustomError.EmailError('User already exists');
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the data to the database
        const query_insert = `INSERT INTO users(username, email, password) VALUES($1, $2, $3)`;
        await runSql(client, query_insert, [username, email.toLowerCase(), hashedPassword]);
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

/**
 * Inserts a movie or TV show into the database for the specified user.
 * This function saves user-specific content to the `saved_movies` table.
 *
 * @param {SaveMovie} body - An object containing the content's ID, title, and description.
 * @param {{ id: number }} user - The authenticated user object containing the user's ID.
 *
 * @returns {Promise<void>} - Resolves when the content is successfully saved.
 *
 * @throws {PostgreSQLError} If the insertion fails due to a database error (e.g., constraint violation).
 */
export async function saveContent(body: SaveMovie, user: { id: number }): Promise<void> {
    const { content_id, title, description, image } = body;
    const fullImagePath = baseImageUrl(image);
    const query = `INSERT INTO saved_movies(content_id, title, description, user_id, image) VALUES($1, $2, $3, $4, $5)`;
    await runSql(pool, query, [content_id, title, description, user.id, fullImagePath]);
}
