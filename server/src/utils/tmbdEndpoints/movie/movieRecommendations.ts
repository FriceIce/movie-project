import { fetchConfig, fetchResponse } from '../../helperFuncs';
import { recommendationsUrl } from '../assets/recommendation';

/**
 * Retrieves recommendations for a specific movie or TV show.
 * @param type The type of recommendations
 * @param {string} id The ID of the movie or TV show to base the recommendations on.
 * @param {Page} page
 */
export default async function recommendations(
    type: 'movie' | 'tv',
    id: string,
    page: Page
): Promise<Recommendations | null> {
    const { options } = fetchConfig('GET', [id]);
    const url =
        type === 'movie'
            ? recommendationsUrl(id, page).movieUrl
            : recommendationsUrl(id, page).tvUrl;
    const response = await fetchResponse<Recommendations>('get', url, options);
    return response;
}
