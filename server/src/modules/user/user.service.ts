import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool, runSql } from '../../config/database';
import { CustomError } from '../../error/errorClasses';
import { baseImageUrl } from '../../utils/helperFuncs';
import { dbUpdateRefreshToken } from './utils/dbUpdateRefreshToken';
import { refreshTokenExists } from './utils/refreshTokenExisting';
import { retrieveOldRefreshToken } from './utils/retrieveOldRefreshToken';

const ACCESS_TOKEN_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
const REFRESH_TOKEN_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY as string;

/**
 * Authenticates a user by checking if the provided email exists and verifying the password.
 * If successful, a JWT token & refresh token is generated and returned alongside user data (excluding the password).
 *
 * @param {LoginUser} body - An object containing the user's email and password.
 *
 * @returns {Promise<{ message: string, data: Omit<RegisterUser, 'password' | 'id'> & { accessToken: string, refreshToken: string } }>}
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

    // Generate JWT token and refresh token
    const id: number = user[0].id;
    const accessToken = jwt.sign({ id }, ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: '15min',
    });
    const refreshToken = jwt.sign({ id }, REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: '7d',
    });

    // Checks if there is an existing refresh token
    refreshTokenExists(id, refreshToken);

    const { password: _, id: __, ...data } = user[0];

    return {
        message: 'Successfully signed in.',
        data: {
            ...data,
            accessToken,
            refreshToken,
        },
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

export async function registerUser(body: RegisterUser): Promise<void> {
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
 * Refreshes a user's authentication tokens.
 *
 * This function verifies the provided refresh token and, if valid, issues a new access token
 * (valid for 5 minutes) and a new refresh token (valid for 7 days). Optionally, it can also
 * validate and update the refresh token in the database.
 *
 * @param {string} oldRefreshToken - The refresh token provided by the client. Must be a valid JWT.
 * @param {boolean} [checkDb] - Whether to verify the refresh token against the database and update it.
 *
 * @throws {CustomError.Forbidden} If the refresh token is missing or invalid.
 * @throws {Error} If token verification or database operations fail.
 */

export async function refreshToken(oldRefreshToken: string, checkDb: boolean | undefined) {
    if (!oldRefreshToken) {
        throw new CustomError.Forbidden('Not allowed to access this data.');
    }

    let payload: JwtPayloadWithId;
    payload = jwt.verify(oldRefreshToken, REFRESH_TOKEN_SECRET_KEY) as JwtPayloadWithId;

    // Retrieve old refresh token from the DB
    const oldTokenExists = checkDb && (await retrieveOldRefreshToken(pool, payload.id));

    // Create new tokens
    const newAccessToken = jwt.sign({ id: payload.id }, ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: '15min',
    });
    const newRefreshToken = jwt.sign({ id: payload.id }, REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: '7d',
    });

    // Update or set new refresh token
    if (oldTokenExists)
        await dbUpdateRefreshToken(pool, oldTokenExists, newRefreshToken, payload.id);

    return {
        newAccessToken,
        newRefreshToken,
    };
}

/**
 * Inserts a movie or TV show into the database for the specified user.
 *
 * @param {SavedContent} body - An object containing the content's ID, images, and content type.
 * @param { id } userId - The authenticated user's ID.
 *
 * @returns {Promise<void>} - Resolves when the content is successfully saved.
 *
 * @throws {PostgreSQLError} If the insertion fails due to a database error (e.g., constraint violation).
 */
export async function saveContent(body: SavedContent, userId: string): Promise<void> {
    const { contentId, images, contentType } = body;
    const query = `INSERT INTO saved_content(content_id, user_id, poster_path, backdrop_path, content_type) VALUES($1, $2, $3, $4, $5)`;
    await runSql(pool, query, [
        contentId,
        userId,
        images.posterPath,
        images.backdropPath,
        contentType,
    ]);
}

/**
 * Deletes a specific saved content item for a given user from the database.
 *
 * @param {string} userId - The unique identifier of the authenticated user.
 * @param {string} contentId - The unique identifier of the saved content to delete.
 * @returns {Promise<void>} A promise that resolves when the deletion is complete.
 */
export async function deleteContent(userId: string, contentId: string) {
    const query = `DELETE FROM saved_content WHERE content_id = $1 AND user_id = $2;`;
    await runSql(pool, query, [contentId, userId]);
}

/**
 * Retrieves all saved content for a given user from the database.
 *
 * @param {string} userId - The unique identifier of the authenticated user.
 * @returns {Promise<SavedContent[]>} A promise that resolves to an array of saved content items.
 * @throws {CustomError.NotFoundError} If no saved content is found for the specified user.
 */
export async function retrieveContent(userId: string): Promise<SavedContent[]> {
    const query = `SELECT * FROM saved_content WHERE user_id = $1;`;
    const list = await runSql<SavedContent>(pool, query, [userId]);

    if (!list || list.length === 0)
        throw new CustomError.NotFoundError('No saved content found for this user.');

    return list;
}

/**
 * Retrieves specific user information.
 *
 *  - Queries the database for the user's email and password.
 *  - Throws a NotFoundError if no user matches the ID.
 *
 * @param {string} userId - The user ID token.
 * @returns {Promise<UserData>} - An object containing email and username.
 * @throws {CustomError.NotFoundError} - If the extracted `id` does not match any user.
 * @throws {JsonWebTokenError} If the token is invalid or expired.
 */

export async function fetchUserInfo(userId: string): Promise<UserData> {
    const query = `SELECT email, username FROM users WHERE id = $1;`;
    const [user] = await runSql<UserData>(pool, query, [userId]);

    if (!user) {
        throw new CustomError.NotFoundError(`No user information found with the id: ${userId}.`);
    }

    return user;
}
