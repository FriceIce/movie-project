import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { consoleLog } from '../../utils/logger';
import { pool, runSql } from '../../connections/dbConncetion';
import { CustomError } from '../../utils/error/error';
import { errorHandler } from '../../utils/error/errorFunc';

/**
 * Checks if the user already exists and if not, creates a new user.
 * @Route /api/register
 * @method POST
 * @requestBody { username: string; email: string, password: string }
 */
export async function register(req: Request, res: Response, next: NextFunction) {
    consoleLog('highlight', 'Entering the register route...');
    const { username, email, password } = req.body as RegisterUser;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        consoleLog('highlight', 'Checking if the user exists...');
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
        consoleLog('highlight', 'Inserting the new user into the database...');
        const query_insert = `INSERT INTO users(username, email, password) VALUES($1, $2, $3)`;
        await runSql(client, query_insert, [username, email.toLowerCase(), hashedPassword]);
        await client.query('COMMIT');

        next();
    } catch (error) {
        await client.query('ROLLBACK');
        errorHandler(error, res);
    } finally {
        client.release();
    }
}

/**
 * Checks if the user exists, then compare the hashed password to the password from the request body.
 * @Route /api/login
 * @method POST
 * @requestBody { email: string, password: string }
 */

export async function login(req: Request, res: Response) {
    console.log('Entering the login route...');
    const { email, password } = req.body as LoginUser;
    const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

    try {
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

        return res.status(200).json({
            message: 'Successfully signed in.',
            data,
            token,
        });
    } catch (error) {
        console.warn(error);
        errorHandler(error, res);
    }
}
