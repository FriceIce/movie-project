import { fetchConfig, fetchResponse } from '../../utils/helperFuncs';
import { discoveryUrl } from './utils/discovery';

/**
 * This function retrieves data (movies / TV shows) from the tmbd discovery endpoint.
 * @param type
 * @param {Page} page
 * @param {string[]} queryParam
 * @returns {Promise<Discovery | null>}
 */
export default async function discovery(
    type: Type,
    page: Page,
    queryParam?: string[]
): Promise<Discovery | null> {
    const { options, query } = fetchConfig('GET', [], queryParam);
    const url = type === 'movie' ? discoveryUrl(page).movie + query : discoveryUrl(page).tv + query;

    const response = await fetchResponse<Discovery>('get', url, options);
    return response;
}
