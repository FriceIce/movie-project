import { CustomError } from '../../../error/errorClasses';
import { fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { typeModifier } from '../controller/utils/typeModifier';
import { discoveryUrl } from './utils/url/discovery';
import { pathModifier } from './utils/pathModifier';

/**
 * Retrieves a list of movies or TV shows from the TMDB discovery endpoint.
 *
 * Constructs a GET request using the provided content type (`movie` or `tv`), page number,
 * and optional query parameters. The function fetches results and processes poster paths
 * by converting them to full image URLs.
 *
 * If the response is empty or null, a `NotFoundError` is thrown.
 *
 * @param {Type} type - The type of content to fetch ('movie' or 'tv').
 * @param {Page} page - The page number for paginated results.
 * @param {string[]} [queryParam] - Optional query parameters for filtering.
 * @returns {Promise<Discovery>} A discovery result containing a list of content.
 * @throws {CustomError.NotFoundError} If no results are found.
 */
export default async function discovery(
    type: Type,
    page: Page,
    queryParam?: string[]
): Promise<Discovery> {
    const { options, query } = fetchConfig('GET', [], queryParam);
    const url = type === 'movie' ? discoveryUrl(page).movie + query : discoveryUrl(page).tv + query;

    const response = await fetchResponse<Discovery>('get', url, options);

    const modifiedType = typeModifier(type);
    if (!response || response.results.length === 0) {
        throw new CustomError.NotFoundError(`No ${modifiedType} found.`);
    }

    // Ensures that the poster_path values inside `response.results` get the full image URL
    pathModifier(response.results as Movie[]);

    return response;
}
