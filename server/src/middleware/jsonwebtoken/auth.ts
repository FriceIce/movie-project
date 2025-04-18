import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import { asyncHandler } from '../../utils/error/errorAsyncHandler';

export interface Auth extends Request {
    user?: string | jwt.JwtPayload;
}

/**
 * Middleware to check if the user is authenticated via a valid JWT token.
 *
 * The process starts by extracting the token from the `Authorization` header.
 * It then ensures that both the `JWT_SECRET` environment variable and the token are present.
 * If all checks pass, the token is verified using `jwt.verify`, and the decoded payload is assigned to `req.user`.
 *
 * @param {Auth} req - Express request object extended with a `user` property.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @throws {Error} If the `JWT_SECRET` is missing.
 * @throws {JsonWebTokenError} If the token is missing, has an invalid signature, or is expired.
 * @returns {void}
 */

export const auth = asyncHandler(
    async (req: Auth, res: Response, next: NextFunction): Promise<void> => {
        const token = req.headers.authorization?.replace('Bearer ', '');
        const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is undefined!');
        }

        if (!token) {
            throw new jwt.JsonWebTokenError('Access denied! JWT token is required.');
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
);
