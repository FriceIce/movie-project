import { Request, Response } from 'express';
import { asyncHandler } from '../../../error/errorAsyncHandler';
import {
    details,
    discovery,
    genres,
    popular,
    recommendations,
    search,
    topRated,
    trending,
} from '../service';
import { queryModifier } from './utils/queryModifier';
import { typeModifier } from './utils/typeModifier';
import { credits } from '../service/credits';
import { videos } from '../service/videos';
import { collection } from '../service/collection';

/**
 * Retrieves a list of movie genres
 * @method GET
 * @route /api/genres
 * @return
 */

export const retrieveGenres = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const type = req.params.type as AllTypes;
    const genresResponse = await genres(type);

    res.status(200).json({
        message: 'Successfully retrieved genres.',
        data: genresResponse,
    });
});

/**
 * Retrieves a list of movies or TV shows from the tmdb 'discovery' endpoint.
 * @method GET
 * @route /api/discovery/:type/:page
 * @return
 */

export const retrieveDiscovery = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const page = req.params.page as Page;
        const type = req.params.type as AllTypes;
        const query = req.query;

        // Modify section.
        const modifiedType = typeModifier(type);
        const queryList = queryModifier(query);

        // Fetch the data.
        const discoveryResponse = await discovery(type, page, queryList);

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
    const type = req.params.type as AllTypes;
    const query = req.query as { page: string };

    const modifiedType = typeModifier(type);
    const trendingResponse = await trending(type, query && [`page=${query.page}`]);

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
    const { type, id } = req.params as { type: AllTypes; id: string };
    const modifiedType = typeModifier(type, true);
    const detailsResponse = await details(type, id);

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
        const { type, id } = req.params as { type: AllTypes; id: string };
        const page = req.params.page as Page;

        const modifiedType = typeModifier(type, true);
        const recommendationResponse = await recommendations(type, id, page);

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
        const { type } = req.params as { type: AllTypes };
        const searchQuery = req.query.query as string;

        console.log({ searchQuery });

        const modifiedType = typeModifier(type);
        const searchResponse = await search<Search>(type, searchQuery);

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
    const type = req.params.type as AllTypes;
    const page = req.params.page as Page;

    const modifiedType = typeModifier(type);
    const popularResponse = await popular(type, page);

    res.status(200).json(popularResponse);
});

/**
 * Retrieves top rated movies and TV shows
 * @method GET
 * @route /api/topRated/:page/:type
 * @returns
 */

export const retrieveTopRated = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const type = req.params.type as AllTypes;
    const page = req.params.page as Page;

    const modifiedType = typeModifier(type);
    const topRatedResponse = await topRated(type, page);

    res.status(200).json({
        message: `Successfully retrieved top rated ${modifiedType}`,
        data: topRatedResponse,
    });
});

/**
 * Retrieves credits for movies and TV shows
 * @method GET
 * @route /api/credits/:type/:id
 * @returns
 */

export const retrieveCredits = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const type = req.params.type as MovieOrTv;
    const id: string = req.params.id;

    const creditResponse = await credits(type, id);

    res.status(200).json({
        message: `Successfully retrieved credits for content with id: ${id}`,
        data: creditResponse,
    });
});

/**
 * Retrieves videos for movies and TV shows
 * @method GET
 * @route /api/videos/:type/:id
 * @returns
 */

export const retrieveVideos = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const type = req.params.type as MovieOrTv;
    const id: string = req.params.id;
    const videosResponse = await videos(type, id);

    res.status(200).json({
        message: `Successfully retrieved credits for content with id: ${id}`,
        data: videosResponse,
    });
});

/**
 * Retrieves collection for movies or TV shows
 * @method GET
 * @route /api/collection/:id
 * @returns
 */

export const retrieveCollection = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const collection_id: string = req.params.id;
        const collectionResponse = await collection(collection_id);

        res.status(200).json({
            message: `Successfully retrieved credits for content with id: ${collection_id}`,
            data: collectionResponse,
        });
    }
);
