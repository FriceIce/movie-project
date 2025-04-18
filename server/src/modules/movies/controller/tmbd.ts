import { Request, Response } from 'express';
import { CustomError } from '../../../utils/error/errorClasses';
import { errorHandler } from '../../../utils/error/errorFunc';
import { typeModifier } from './utils/typeModifier';
import {
    details,
    discovery,
    genres,
    recommendations,
    trending,
    search,
    popular,
    topRated,
} from '../../movies/service';
import { asyncHandler } from '../../../utils/error/errorAsyncHandler';

/**
 * Retrieves a list of movie genres
 * @method GET
 * @route /api/genres
 * @return
 */

export const retrieveGenres = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const type = req.params.type as Type;
    const genresResponse = await genres(type);

    if (!genresResponse || genresResponse.genres.length === 0)
        throw new CustomError.NotFoundError('No genres found.');

    res.status(200).json({
        message: 'Successfully retrieved genres.',
        data: genresResponse,
    });
});

/**
 * Retrieves a list of movies or TV shows from the tmbd 'discovery' endpoint.
 * @method GET
 * @route /api/discovery/:type/:page
 * @return
 */

export const retrieveDiscovery = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const page = req.params.page as Page;
        const type = req.params.type as Type;
        const query = req.query;

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
    }
);

/**
 * Retrieves trending movies and TV shows
 * @method GET
 * @route /api/trending/:type
 * @returns
 */

export const retrieveTrending = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const type = req.params.type as Type;
    const modifiedType = typeModifier(type);

    const trendingResponse = await trending(type);

    if (!trendingResponse || trendingResponse.results.length === 0) {
        throw new CustomError.NotFoundError(`No trending ${modifiedType} found.`);
    }

    res.status(200).json({
        message: `Successfully retrieved trending ${modifiedType}`,
        data: trendingResponse,
    });
});

/**
 * Retrieves details about a specific movie or TV show based on id.
 * @method GET
 * @route /api/details/:type/:id
 * @returns
 */

export const retrieveDetails = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { type, id } = req.params as { type: Type; id: string };
    const modifiedType = typeModifier(type, true);

    const detailsResponse = await details(type, id);

    if (!detailsResponse) {
        throw new CustomError.NotFoundError(`No details found for ${modifiedType} with id ${id}`);
    }

    res.status(200).json({
        message: `Successfully retrieved details for ${modifiedType} with id ${id}`,
        data: detailsResponse,
    });
});

/**
 * Retrieves recommendations based on a movie or TV show id.
 * @method GET
 * @route /api/recommendations/:page/:type/:id
 * @returns
 */

export const retrieveRecommendations = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const { type, id } = req.params as { type: Type; id: string };
        const page = req.params.page as Page;
        const modifiedType = typeModifier(type, true);

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
    }
);

/**
 * Retrieves search results for given input.
 * @method GET
 * @route /api/search/:type
 * @query search
 * @returns
 */

export const retrieveSearchResults = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const { type } = req.params as { type: Type };
        const searchQuery = req.query.query as string;
        const modifiedType = typeModifier(type);

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
    }
);

/**
 * Retrieves popular movies and TV shows for the week.
 * @method GET
 * @route /api/popular/:page/:type
 * @query search
 * @returns
 */

export const retrievePopular = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const type = req.params.type as Type;
    const page = req.params.page as Page;
    const modifiedType = typeModifier(type);

    const popularResponse = await popular(type, page);

    if (!popularResponse || popularResponse.results.length === 0) {
        throw new CustomError.NotFoundError(`No popular ${modifiedType} found.`);
    }

    res.status(200).json({
        message: `Successfully retrieved popular ${modifiedType}`,
        data: popularResponse,
    });
});

/**
 * Retrieves top rated movies and TV shows
 * @method GET
 * @route /api/topRated/:page/:type
 * @returns
 */

export const retrieveTopRated = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const type = req.params.type as Type;
    const page = req.params.page as Page;
    const modifiedType = typeModifier(type);

    const topRatedResponse = await topRated(type, page);

    if (!topRatedResponse || topRatedResponse.results.length === 0) {
        throw new CustomError.NotFoundError(`No top rated ${modifiedType} found.`);
    }

    res.status(200).json({
        message: `Successfully retrieved top rated ${modifiedType}`,
        data: topRatedResponse,
    });
});
