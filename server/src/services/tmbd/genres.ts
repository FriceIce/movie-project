import { fetchConfig, fetchResponse } from '../../utils/helperFuncs';
import { genresUrl } from './utils/genres';

/**
 * Retrieves a list of genres for movies or TV shows
 * @param type
 */
export default async function genres(type: Type): Promise<Genres | null> {
    const { options } = fetchConfig('GET');
    const url = type === 'movie' ? genresUrl.movie : genresUrl.tv;

    const response = await fetchResponse<Genres>('get', url, options);
    return response;
}
