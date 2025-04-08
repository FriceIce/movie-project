import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { consoleLog } from '../../utils/logger';
import 'dotenv/config';
import { errorHandler } from '../../utils/error/errorFunc';

interface Auth extends Request {
    user?: string | jwt.JwtPayload;
}

/**
 * Checks if the user is authenticated with a valid token.
 * @param {Auth} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */

export async function auth(req: Auth, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is undefined!');
    }

    try {
        if (!token) {
            throw new jwt.JsonWebTokenError('Access denied! JWT token is required.');
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        errorHandler(error, res);
    }
}
