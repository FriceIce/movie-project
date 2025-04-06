import { fetchConfig, fetchResponse } from '../../helperFuncs';
import { topRatedUrl } from '../assets/topRated';

/**
 * @param type
 * @param {Page} page
 * @returns
 */
export default async function topRated(type: 'movie' | 'tv', page: Page): Promise<TopRated | null> {
    const { options } = fetchConfig('GET');
    const url = type === 'movie' ? topRatedUrl(page).movie : topRatedUrl(page).tv;
    const response = await fetchResponse<TopRated>('get', url, options);
    return response;
}
