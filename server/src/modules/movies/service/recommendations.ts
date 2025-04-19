import { CustomError } from '../../../utils/error/errorClasses';
import { fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { typeModifier } from '../controller/utils/typeModifier';
import { pathModifier } from './utils/pathModifier';
import { recommendationsUrl } from './utils/recommendation';

/**
 * Retrieves recommendations for a specific movie or TV show.
 * @param type The type of recommendations
 * @param {string} id The ID of the movie or TV show to base the recommendations on.
 * @param {Page} page
 */
export default async function recommendations(
    type: Type,
    id: string,
    page: Page
): Promise<Recommendations> {
    const { options } = fetchConfig('GET', [id]);
    const url =
        type === 'movie' ? recommendationsUrl(id, page).movie : recommendationsUrl(id, page).tv;
    const response = await fetchResponse<Recommendations>('get', url, options);

    const modifiedType = typeModifier(type, true);
    if (!response || response.results.length === 0) {
        throw new CustomError.NotFoundError(
            `No recommendations found for ${modifiedType} with id ${id}`
        );
    }

    // Ensures that the poster_path values inside `response.results` get the full image URL
    pathModifier(response.results as Movie[]);

    return response;
}
