import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../../utils/error/errorFunc';
import { loginUser, registerUser } from './user.service';

/**
 * Checks if the user already exists and if not, creates a new user.
 * @Route /api/register
 * @method POST
 * @requestBody { username: string; email: string, password: string }
 */
export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
    const body = req.body as RegisterUser;

    try {
        await registerUser(body);
        next();
    } catch (error) {
        console.warn(error);
        errorHandler(error, res);
    }
}

/**
 * Checks if the user exists, then compare the hashed password to the password from the request body.
 * @Route /api/login
 * @method POST
 * @requestBody { email: string, password: string }
 */

export async function login(req: Request, res: Response): Promise<void> {
    const body = req.body as LoginUser;

    try {
        const user = await loginUser(body);
        res.status(200).json(user);
    } catch (error) {
        console.warn(error);
        errorHandler(error, res);
    }
}
