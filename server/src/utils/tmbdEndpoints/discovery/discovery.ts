import { fetchConfig, fetchResponse } from '../helperFuncs';
import { discoveryUrl } from './assets/discovery';

/**
 * This function retrieves discovery data (movies / TV shows) from tmbd endpoints.
 * @param type
 * @param {Page} page
 * @param {string[]} queryParam
 * @returns {Promise<Discovery | null>}
 */
export default async function discovery(
    type: 'movie' | 'tv',
    page: Page,
    queryParam?: string[]
): Promise<Discovery | null> {
    const { options, query } = fetchConfig('GET', [], queryParam);
    const url = type === 'movie' ? discoveryUrl(page).movie + query : discoveryUrl('1').tv + query;

    const response = await fetchResponse<Discovery>('get', url, options);
    return response;
}
