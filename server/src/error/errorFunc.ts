import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from './errorClasses';

export function errorHandler(error: unknown, _: Request, response: Response, next: NextFunction) {
    // In situations where a response has already been sent to the client.
    if (response.headersSent) return next(error);

    if (
        error instanceof CustomError.EmailError ||
        error instanceof CustomError.PasswordError ||
        error instanceof CustomError.NotFoundError ||
        error instanceof CustomError.BadRequestError ||
        error instanceof CustomError.PostgreSQLError ||
        error instanceof CustomError.Unauthorized
    ) {
        console.warn('Error:', error.message);
        return response.status(error.statusCode).json({
            statusCode: error.statusCode,
            message: error.message,
        });
    }

    if (error instanceof jwt.JsonWebTokenError) {
        return response.status(401).json({
            statusCode: 401,
            message: error.message,
        });
    }

    if (error instanceof jwt.TokenExpiredError) {
        return response.status(403).json({
            statusCode: 403,
            message: error.message,
        });
    }

    if (error instanceof Error) {
        console.warn('Error:', error.message);

        return response.status(500).json({
            statusCode: 500,
            message: error.message,
        });
    }

    console.log(error);
    return response.status(500).json({
        statusCode: 500,
        message: 'Something unexpected went wrong',
    });
}
