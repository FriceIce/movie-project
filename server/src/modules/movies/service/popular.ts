import { cache } from '../../../config/cache';
import { CustomError } from '../../../error/errorClasses';
import { fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { typeModifier } from '../controller/utils/typeModifier';
import { pathModifier } from './utils/pathModifier';
import { popularUrl } from './utils/url/popular';

/**
 * Retrieves a list of popular movies and TV shows.
 *
 * @param { AllTypes } type The type of content to retrieve, (movie or tv)
 * @param { Page } page The page number
 * @returns {Promise<Popular>} An object containig a list of popular content.
 * @throws {NotFoundError} If no results are found.
 */
export default async function popular(type: AllTypes, page: Page): Promise<Popular> {
    const cached = cache.get<Popular>(`popular/${type}/${page}`);
    if (cached) return cached;

    const { options } = fetchConfig('GET');
    const url = type === 'movie' ? popularUrl(page).movie : popularUrl(page).tv;
    const response = await fetchResponse<Popular>('get', url, options);

    const modifiedType = typeModifier(type);
    if (!response || response.results.length === 0) {
        throw new CustomError.NotFoundError(`No popular ${modifiedType} found.`);
    }

    // Set cache
    cache.set(`popular/${type}/${page}`, response);

    return response;
}
