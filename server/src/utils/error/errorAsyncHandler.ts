import { NextFunction, Request, Response } from 'express';

/**
 * Wraps an asynchronous route handler to catch error and pass them to Express error handling middleware.
 * By doing this there is no repetitive try/catch block in every route handler.
 *
 * @param fn - Asynchronus route handler
 * @returns a function that handles the request and forwards any rejected promises to the next function
 */

export function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
    return (req: Request, res: Response, next: NextFunction) =>
        Promise.resolve(fn(req, res, next)).catch(next);
}
