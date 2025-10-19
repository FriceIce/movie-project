import { CustomError } from '../../../error/errorClasses';
import { fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { typeModifier } from '../controller/utils/typeModifier';
import { discoveryUrl } from './utils/url/discovery';
import { pathModifier } from './utils/pathModifier';
import { cache } from '../../../config/cache';

/**
 * Retrieves a list of movies or TV shows from the TMDB discovery endpoint.
 *
 * Constructs a GET request using the provided content type (`movie` or `tv`), page number,
 * and optional query parameters. The function fetches results and processes poster paths
 * by converting them to full image URLs.
 *
 * If the response is empty or null, a `NotFoundError` is thrown.
 *
 * @param {AllTypes} type - The type of content to fetch ('movie' or 'tv').
 * @param {Page} page - The page number for paginated results.
 * @param {string[]} [queryParam] - Optional query parameters for filtering.
 * @returns {Promise<Discovery>} A discovery result containing a list of content.
 * @throws {CustomError.NotFoundError} If no results are found.
 */
export default async function discovery(
    type: AllTypes,
    page: Page,
    queryParam?: string[]
): Promise<Discovery> {
    const cached = cache.get<Discovery>(`discovery/${type}/${page}/${queryParam}`);
    if (cached) return cached;

    const { options, query } = fetchConfig('GET', [], queryParam);
    const url = type === 'movie' ? discoveryUrl(page).movie + query : discoveryUrl(page).tv + query;

    const response = await fetchResponse<Discovery>('get', url, options);

    const modifiedType = typeModifier(type);
    if (!response || response.results.length === 0) {
        throw new CustomError.NotFoundError(`No ${modifiedType} found.`);
    }

    // Set cache
    cache.set(`discovery/${type}/${page}/${queryParam}`, response);

    return response;
}
