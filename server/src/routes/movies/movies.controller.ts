import { Request, Response } from 'express';
import { genres } from '../../utils/tmbdApi';
import { CustomError } from '../../utils/error/error';
import { errorHandler } from '../../utils/error/errorFunc';

/**
 * Retrieves a list of movie genres
 * @method GET
 * @route /api/MovieGenres
 * @return
 */

export async function retrieveGenres(req: Request, res: Response) {
    function isValidType(type: any): boolean {
        return type === 'movie' || type === 'tv';
    }

    try {
        const type = req.params.type as Type;
        const genresResponse = await genres(type);

        if (!isValidType(type.toLowerCase()))
            throw new CustomError.BadRequestError('Parameter is not valid');

        if (!genresResponse) throw new CustomError.NotFoundError('No genres found.');

        return res.status(200).json({
            message: 'Successfully retrieved genres.',
            data: genresResponse,
        });
    } catch (error) {
        console.warn(error);
        errorHandler(error, res);
    }
}
