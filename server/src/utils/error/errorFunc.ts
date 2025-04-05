import { consoleLog } from '../logger';
import { CustomError } from './error';
import { Response } from 'express';
// import {}

export function errorHandler(error: unknown, res: Response) {
    if (error instanceof Error) {
        consoleLog('error', 'Error: ' + error.message);

        if (error instanceof CustomError.EmailError) {
            return res.status(error.statusCode).json({
                message: error.message,
            });
        }

        if (error instanceof CustomError.PasswordError) {
            return res.status(error.statusCode).json({
                message: error.message,
            });
        }

        return res.status(500).json({ message: 'Something went wrong' });
    }
}
