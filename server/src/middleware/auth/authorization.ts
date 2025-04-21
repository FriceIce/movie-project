import { NextFunction, Response } from 'express';
import { asyncHandler } from '../../error/errorAsyncHandler';
import { CustomError } from '../../error/errorClasses';
import { Auth } from './authentication';

/**
 * This middleware function checks if the current request has access to specified endpoint.
 *
 * @param {Auth} Express Request object extended with a `user` property.
 * @param {Response} _
 * @param {NextFunction} Express Express next middleware function.
 * @return {Promise<void>}
 * @throws {`CustomError.Unauthorized`} If the is a 'guest' property inside the `req.user` object.
 * @throws {`CustomError.BadRequestError`} If the `req.user` object is null.
 */

export const authorization = asyncHandler(
    async (req: Auth, _: Response, next: NextFunction): Promise<void> => {
        const guest = req?.user?.guest; // has the value: true, false, or undefined.
        if (guest === true) {
            throw new CustomError.Unauthorized(
                'The current request is not authorized to access this endpoint.'
            );
        }

        if (!req.user) throw new CustomError.BadRequestError('There is no request token.');

        // If the request is authorized, continue to the next step.
        next();
    }
);
