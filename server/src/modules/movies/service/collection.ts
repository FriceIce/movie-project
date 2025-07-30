import { Collection } from '../../../types/tmdb/collection';
import { fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { collectionUrl } from './utils/url/collectionUrl';

/**
 * Retrieves the collection for a specific content.
 *
 * @param {string} id - The collection id
 * @returns {Promise<Collection | null>} - Returns a promise with the Collection data if successful.
 * @throws {Error} Throws an error if the fetch request was sent but did not succeed.
 */

export async function collection(id: string): Promise<Collection> {
    const { options } = fetchConfig('GET');
    const url = collectionUrl(id);
    const response = await fetchResponse<Collection>('get', url, options);

    if (!response) throw new Error('The fetch request was sent but did not succeed.');

    return response;
}
