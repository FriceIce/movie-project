import { cache } from '../../../config/cache';
import { CustomError } from '../../../error/errorClasses';
import { fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { typeModifier } from '../controller/utils/typeModifier';
import { trendingUrl } from './utils/url/trending';

/**
 * Retrieves trending movies and TV shows.
 *
 * @param { AllTypes } type The type of content.
 * @returns {Promise<Trending>} An object containing a list of trending contents.
 * @throws {NotFoundError} If no results are found.
 */
export default async function trending(type: AllTypes, queries?: string[]): Promise<Trending> {
    const cached = cache.get<Trending>(`topRated/${type}/${queries}`);
    if (cached) return cached;

    const { options, query } = fetchConfig('GET', [], queries);
    const url = type === 'movie' ? trendingUrl.movie : trendingUrl.tv + query;
    const response = await fetchResponse<Trending>('get', url, options);

    const modifiedType = typeModifier(type);
    if (!response || response.results.length === 0) {
        throw new CustomError.NotFoundError(`No trending ${modifiedType} found.`);
    }

    // Set cache
    cache.set(`topRated/${type}/${queries}`, response);

    return response;
}
