import { CustomError } from '../../../utils/error/errorClasses';
import { fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { typeModifier } from '../controller/utils/typeModifier';
import { pathModifier } from './utils/pathModifier';
import { popularUrl } from './utils/url/popular';

/**
 * Retrieves a list of popular movies and TV shows.
 * @param { Type } type The type of content to retrieve
 * @param { Page } page The page to retrieve
 * @returns
 */
export default async function popular(type: Type, page: Page): Promise<Popular> {
    const { options } = fetchConfig('GET');
    const url = type === 'movie' ? popularUrl(page).movie : popularUrl(page).tv;
    const response = await fetchResponse<Popular>('get', url, options);

    const modifiedType = typeModifier(type);
    if (!response || response.results.length === 0) {
        throw new CustomError.NotFoundError(`No popular ${modifiedType} found.`);
    }

    // Ensures that the poster_path values inside `response.results` get the full image URL
    pathModifier(response.results as Movie[]);

    return response;
}
