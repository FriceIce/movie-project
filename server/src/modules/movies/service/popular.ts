import { fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { popularUrl } from './utils/popular';

/**
 * Retrieves a list of popular movies and TV shows.
 * @param { Type } type The type of content to retrieve
 * @param { Page } page The page to retrieve
 * @returns
 */
export default async function popular(type: Type, page: Page): Promise<Popular | null> {
    const { options } = fetchConfig('GET');
    const url = type === 'movie' ? popularUrl(page).movie : popularUrl(page).tv;
    const response = await fetchResponse<Popular>('get', url, options);
    return response;
}
