import { fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { creditsUrl } from './utils/url/credits';

/**
 * Fetches the credits (cast and crew) for a specific movie or TV show.
 *
 * @param {MovieOrTv} type - Media type, either "movie" or "tv".
 * @param {string} id - The specific content id.
 * @returns {Promise<Credits | null>} A promise that with the credits data if successful.
 * @throws {Error} Throws an error if the fetch request was sent but did not succeed.
 */

export async function credits(type: MovieOrTv, id: string): Promise<Credits> {
    const { options } = fetchConfig('GET');
    const url = creditsUrl(id, type);

    const response = await fetchResponse<Credits>('get', url, options);
    if (!response) {
        throw new Error('The fetch request was sent but did not succeed.');
    }

    return response;
}
