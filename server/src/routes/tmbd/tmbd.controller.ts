import { Request, Response } from 'express';
import { discovery, genres } from '../../utils/tmbdApi';
import { CustomError } from '../../utils/error/error';
import { errorHandler } from '../../utils/error/errorFunc';

/**
 * Retrieves a list of movie genres
 * @method GET
 * @route /api/genres
 * @return
 */

export async function retrieveGenres(req: Request, res: Response): Promise<void> {
    try {
        const type = req.params.type as Type;
        const genresResponse = await genres(type);

        if (!genresResponse) throw new CustomError.NotFoundError('No genres found.');

        res.status(200).json({
            message: 'Successfully retrieved genres.',
            data: genresResponse,
        });
    } catch (error) {
        console.warn(error);
        errorHandler(error, res);
    }
}

/**
 * Retrieves a list of movies or TV shows from the tmbd 'discovery' endpoint.
 * @method GET
 * @route /api/discovery/:type
 * @return
 */

export async function retrieveDiscovery(req: Request, res: Response): Promise<void> {
    const page = req.body.page as Page;
    const type = req.params.type as Type;
    const query = req.query;

    try {
        const modifiedType = type === 'tv' ? 'TV shows' : 'movies';

        // Iterates through the object and extracts each property and its value, and pushing them into the empty array as a string, since that's what the function expects.
        const queryList = [];

        if (query) {
            for (const property in query) {
                queryList.push(`${property}=${query[property]}`);
            }
        }

        // Fetch the data.
        const discoveryResponse = await discovery(type, page, queryList);

        if (!discoveryResponse) {
            throw new CustomError.NotFoundError(`No ${modifiedType} found.`);
        }

        res.status(200).json({
            message: `Successfully retrieved ${modifiedType}`,
            data: discoveryResponse,
        });
    } catch (error) {
        console.warn(error);
        errorHandler(error, res);
    }
}
