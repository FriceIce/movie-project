import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../../error/errorAsyncHandler';
import { loginUser, registerUser, saveContent } from './user.service';
import { Auth } from '../../middleware/auth/authentication';

/**
 * Handles user registration by checking if the user already exists.
 * If not, it creates a new user with a hashed password and stores it in the database.
 *
 * @route /api/register
 * @method POST
 * @throws {EmailError} If the email is already in use.
 *
 * @param req
 * @param res
 * @param next
 */
export const userRegister = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const body = req.body as RegisterUser;
        await registerUser(body);
        next();
    }
);

/**
 * Controller function that handles the login process for a user.
 *
 * This function first checks if the user exists by verifying the provided email.
 * If the email exists, the hashed password from the database is compared with the password
 * provided in the request body. If the passwords match, a success message, user data (excluding password),
 * and a JWT token are sent back to the client.
 *
 * @route /api/login
 * @method POST
 *
 * @param {Request} req
 * @param {Response} res
 *
 * @returns {Promise<void>} - Sends a response with either the user data and token if login is successful,
 * or an error message if login fails.
 *
 * @throws {EmailError} If the email is not registered.
 * @throws {PasswordError} If the provided password does not match the stored password.
 * @throws {PostgreSQLError} If there is a database error during the login process.
 */

export const userLogin = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const body = req.body as LoginUser;
    const user = await loginUser(body);
    res.status(200).json(user);
});
/**
 * This controller function handles saving content (e.g., movies or TV shows) for a user.
 * It extracts the user ID from the JWT token and passes the content data to the 'saveContent' function.
 * A success message is returned if the operation is successful, and an error is handled accordingly.
 *
 * @route /api/savedContent
 * @method POST
 *
 * @param {Auth} req - The request object, which contains the user information (e.g., the user's ID in req.user).
 * @param {Response} res
 *
 * @returns {Promise<void>} - Sends a response with a success message or an error message.
 *
 * @throws {CustomError} - Any errors thrown during the `saveContent` operation will be passed to the error handler.
 */

export const userSaveContent = asyncHandler(async (req: Auth, res: Response): Promise<void> => {
    const token = req.user as { id: number };
    await saveContent(req.body, token);
    res.status(200).json({
        message: 'The content was sucessfully stored in the databse.',
    });
});

/**
 * This controller function handles the guest login.
 * It signs a JWT token with a payload indicating a 'guest' user and returns the token along with a message to the client.
 *
 * @param {Request} req
 * @param {Response} res
 *
 * @returns {Promise<void>}
 * @throws {JsonWebTokenError} If the jwt.sign method throws an error.
 */

export const userGuestLogin = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const token = jwt.sign({ guest: true }, String(process.env.JWT_SECRET_KEY), {
        expiresIn: '1h',
    });

    res.status(200).json({
        message: 'The guest user was succesfully logged in.',
        token,
    });
});
