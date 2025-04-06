import { Request, Response } from 'express';
import { details, discovery, genres, recommendations, trending } from '../../utils/tmbdApi';
import { CustomError } from '../../utils/error/error';
import { errorHandler } from '../../utils/error/errorFunc';
import { typeModifier } from '../assets/typeModifier';

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
        const modifiedType = typeModifier(type);

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

/**
 * Retrieves trending movies and TV shows
 * @method GET
 * @route /api/trending/:type
 * @returns
 */

export async function retrieveTrending(req: Request, res: Response): Promise<void> {
    const type = req.params.type as Type;
    const modifiedType = typeModifier(type);

    try {
        const trendingResponse = await trending(type);

        if (!trendingResponse) {
            throw new CustomError.NotFoundError(`No trending ${modifiedType} found.`);
        }

        res.status(200).json({
            message: `Successfully retrieved trending ${modifiedType}`,
            data: trendingResponse,
        });
    } catch (error) {
        console.warn(error);
        errorHandler(error, res);
    }
}

/**
 * Retrieves details about a specific movie or TV show based on id.
 * @method GET
 * @route /api/details/:type/:id
 * @returns
 */

export async function retireveDetails(req: Request, res: Response): Promise<void> {
    const { type, id } = req.params as { type: Type; id: string };
    const modifiedType = typeModifier(type, true);

    try {
        const detailsResponse = await details(type, id);

        if (!detailsResponse) {
            throw new CustomError.NotFoundError(
                `No details found for ${modifiedType} with id ${id}`
            );
        }

        res.status(200).json({
            message: `Successfully retrieved details for ${modifiedType} with id ${id}`,
            data: detailsResponse,
        });
    } catch (error) {
        console.warn(error);
        errorHandler(error, res);
    }
}

/**
 * Retrieves recommendations based on a movie or TV show id.
 * @method GET
 * @route /api/recommendations/:type/:id
 * @returns
 */

export async function retrieveRecommendations(req: Request, res: Response): Promise<void> {
    const { type, id } = req.params as { type: Type; id: string };
    const page = req.body.page as Page;
    const modifiedType = typeModifier(type, true);

    try {
        const recommendationResponse = await recommendations(type, id, page);

        if (!recommendationResponse) {
            throw new CustomError.NotFoundError(
                `No recommendations found for ${modifiedType} with id ${id}`
            );
        }

        res.status(200).json({
            message: `Successfully retrieved recommendations for ${modifiedType} with id ${id}`,
            data: recommendationResponse,
        });
    } catch (error) {
        console.warn(error);
        errorHandler(error, res);
    }
}
