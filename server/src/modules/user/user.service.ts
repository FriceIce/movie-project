import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { runSql, pool } from '../../config/database';
import { CustomError } from '../../utils/error/error';

/**
 * This function handles the log in process.
 * @param {LoginUser} body
 * @returns
 */

export async function loginUser(body: LoginUser) {
    const { email, password } = body;
    const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

    // Check if the email is valid
    const query_user = `SELECT username, email, password FROM users WHERE email = $1;`;
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
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    const { password: _, ...data } = user[0];

    return {
        message: 'Successfully signed in.',
        data,
        token,
    };
}

/**
 * Register user by first checking if the user exists. If not, proceed to insert user data into the database.
 * @param body - user data
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
