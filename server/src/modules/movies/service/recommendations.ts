import { cache } from '../../../config/cache';
import { CustomError } from '../../../error/errorClasses';
import { fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { typeModifier } from '../controller/utils/typeModifier';
import { pathModifier } from './utils/pathModifier';
import { recommendationsUrl } from './utils/url/recommendation';

/**
 * Retrieves recommendations based on a movie or TV show.
 *
 * @param type The type of recommendations
 * @param {string} id The ID of the movie or TV show to base the recommendations on.
 * @param {Page} page The page number
 * @returns {Promise<Recommendations>} An object that contains recommendations based on content ID.
 */
export default async function recommendations(
    type: AllTypes,
    id: string,
    page: Page
): Promise<Recommendations> {
    const cached = cache.get<Recommendations>(`recommendation/${id}`);
    if (cached) {
        return cached;
    }

    const { options } = fetchConfig('GET');
    const url =
        type === 'movie' ? recommendationsUrl(id, page).movie : recommendationsUrl(id, page).tv;
    const response = await fetchResponse<Recommendations>('get', url, options);

    const modifiedType = typeModifier(type, true);
    if (!response) {
        throw new CustomError.NotFoundError(
            `No recommendations found for ${modifiedType} with id ${id}`
        );
    }

    // Set cache
    cache.set(`recommendation/${id}`, response);

    return response;
}
