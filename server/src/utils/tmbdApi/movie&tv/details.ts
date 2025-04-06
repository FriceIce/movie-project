import { MovieDetail } from '../../../types/movies';
import { fetchConfig, fetchResponse } from '../../helperFuncs';
import { detailsUrl } from '../assets/details';

/**
 * Retrieves an object containg movie details.
 * @param {string} id
 */
export default async function details(
    type: Type,
    id: string
): Promise<MovieDetail.Response | null> {
    const { options } = fetchConfig('GET', [id]);
    const url = type === 'movie' ? detailsUrl(id).movie : detailsUrl(id).tv;

    const response = await fetchResponse<MovieDetail.Response>('get', url, options);
    return response;
}
