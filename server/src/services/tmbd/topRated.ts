import { fetchConfig, fetchResponse } from '../../utils/helperFuncs';
import { topRatedUrl } from './utils/topRated';

/**
 * @param { Type } type The type of content to retrieve
 * @param { Page } page The page to retrieve
 * @returns
 */
export default async function topRated(type: Type, page: Page): Promise<TopRated | null> {
    const { options } = fetchConfig('GET');
    const url = type === 'movie' ? topRatedUrl(page).movie : topRatedUrl(page).tv;
    const response = await fetchResponse<TopRated>('get', url, options);
    return response;
}
