import { CustomError } from '../../../error/errorClasses';
import { fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { typeModifier } from '../controller/utils/typeModifier';
import { pathModifier } from './utils/pathModifier';
import { topRatedUrl } from './utils/url/topRated';

/**
 * Retrieves top rated content for movies and TV shows.
 *
 * @param { Type } type The type of content to retrieve.
 * @param { Page } page The page number.
 * @returns {Promise<TopRated>} An object containing a list of top rated content.
 * @throws {NotFoundError} If no results are found.
 */
export default async function topRated(type: Type, page: Page): Promise<TopRated> {
    const { options } = fetchConfig('GET');
    const url = type === 'movie' ? topRatedUrl(page).movie : topRatedUrl(page).tv;
    const response = await fetchResponse<TopRated>('get', url, options);

    const modifiedType = typeModifier(type);
    if (!response || response.results.length === 0) {
        throw new CustomError.NotFoundError(`No top rated ${modifiedType} found.`);
    }

    // Ensures that the poster_path values inside `response.results` get the full image URL
    pathModifier(response.results as Movie[]);

    return response;
}
