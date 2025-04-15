import { Request, Response } from 'express';
import {
    details,
    discovery,
    genres,
    recommendations,
    trending,
    search,
    popular,
    topRated,
} from '../../services/tmbd';
import { CustomError } from '../../utils/error/error';
import { errorHandler } from '../../utils/error/errorFunc';
import { typeModifier } from '../utils/typeModifier';

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

        if (!genresResponse || genresResponse.genres.length === 0)
            throw new CustomError.NotFoundError('No genres found.');

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
 * @route /api/discovery/:type/:page
 * @return
 */

export async function retrieveDiscovery(req: Request, res: Response): Promise<void> {
    const page = req.params.page as Page;
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

        if (!discoveryResponse || discoveryResponse.results.length === 0) {
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

        if (!trendingResponse || trendingResponse.results.length === 0) {
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

export async function retrieveDetails(req: Request, res: Response): Promise<void> {
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
 * @route /api/recommendations/:page/:type/:id
 * @returns
 */

export async function retrieveRecommendations(req: Request, res: Response): Promise<void> {
    const { type, id } = req.params as { type: Type; id: string };
    const page = req.params.page as Page;
    const modifiedType = typeModifier(type, true);

    try {
        const recommendationResponse = await recommendations(type, id, page);

        if (!recommendationResponse || recommendationResponse.results.length === 0) {
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

/**
 * Retrieves search results for given input.
 * @method GET
 * @route /api/search/:type
 * @query search
 * @returns
 */

export async function retrieveSearchResults(req: Request, res: Response): Promise<void> {
    const { type } = req.params as { type: Type };
    const searchQuery = req.query.query as string;
    const modifiedType = typeModifier(type);

    try {
        const searchResponse = await search<Search>(type, searchQuery);
        if (!searchResponse || searchResponse.results.length === 0) {
            throw new CustomError.NotFoundError(
                `No search results found for ${modifiedType} with search query "${searchQuery}"`
            );
        }
        res.status(200).json({
            message: `Successfully retrieved search results for ${modifiedType} with search query "${searchQuery}"`,
            data: searchResponse,
        });
    } catch (error) {
        console.warn(error);
        errorHandler(error, res);
    }
}

/**
 * Retrieves popular movies and TV shows for the week.
 * @method GET
 * @route /api/popular/:page/:type
 * @query search
 * @returns
 */

export async function retrievePopular(req: Request, res: Response): Promise<void> {
    const type = req.params.type as Type;
    const page = req.params.page as Page;
    const modifiedType = typeModifier(type);

    try {
        const popularResponse = await popular(type, page);

        if (!popularResponse || popularResponse.results.length === 0) {
            throw new CustomError.NotFoundError(`No popular ${modifiedType} found.`);
        }

        res.status(200).json({
            message: `Successfully retrieved popular ${modifiedType}`,
            data: popularResponse,
        });
    } catch (error) {
        console.warn(error);
        errorHandler(error, res);
    }
}

/**
 * Retrieves top rated movies and TV shows
 * @method GET
 * @route /api/topRated/:page/:type
 * @returns
 */

export async function retrieveTopRated(req: Request, res: Response): Promise<void> {
    const type = req.params.type as Type;
    const page = req.params.page as Page;
    const modifiedType = typeModifier(type);

    try {
        const topRatedResponse = await topRated(type, page);

        if (!topRatedResponse || topRatedResponse.results.length === 0) {
            throw new CustomError.NotFoundError(`No top rated ${modifiedType} found.`);
        }

        res.status(200).json({
            message: `Successfully retrieved top rated ${modifiedType}`,
            data: topRatedResponse,
        });
    } catch (error) {
        console.warn(error);
        errorHandler(error, res);
    }
}
