import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

/**
 * Checks if the request meets the requirements defined by the express-validator.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};
