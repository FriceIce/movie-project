import jwt from 'jsonwebtoken';
import { CustomError } from './error';
import { Response } from 'express';
// import {}

export function errorHandler(error: unknown, res: Response) {
    if (
        error instanceof CustomError.EmailError ||
        error instanceof CustomError.PasswordError ||
        error instanceof CustomError.NotFoundError ||
        error instanceof CustomError.BadRequestError ||
        error instanceof CustomError.PostgreSQLError
    ) {
        console.warn('Error:', error.message);
        return res.status(error.statusCode).json({
            message: error.message,
        });
    }

    if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: error.message });
    }

    if (error instanceof jwt.TokenExpiredError) {
        return res.status(403).json({ message: error.message });
    }

    if (error instanceof Error) {
        console.warn('Error:', error.message);

        return res.status(500).json({ message: 'Something went wrong' });
    }

    console.log(error);
    return res.status(500).json({ message: 'Something unexpected went wrong' });
}
