import { NotFoundError } from 'openai';
import { CustomError } from '../../../error/errorClasses';
import { fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { typeModifier } from '../controller/utils/typeModifier';
import { pathModifier } from './utils/pathModifier';
import { trendingUrl } from './utils/url/trending';

/**
 * Retrieves trending movies and TV shows.
 *
 * @param { AllTypes } type The type of content.
 * @returns {Promise<Trending>} An object containing a list of trending contents.
 * @throws {NotFoundError} If no results are found.
 */
export default async function trending(type: AllTypes): Promise<Trending> {
    const { options } = fetchConfig('GET');
    const url = type === 'movie' ? trendingUrl.movie : trendingUrl.tv;
    const response = await fetchResponse<Trending>('get', url, options);

    const modifiedType = typeModifier(type);
    if (!response || response.results.length === 0) {
        throw new CustomError.NotFoundError(`No trending ${modifiedType} found.`);
    }

    // Ensures that the poster_path values inside `response.results` get the full image URL
    // pathModifier(response.results as Movie[]);

    return response;
}
