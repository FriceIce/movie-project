import { fetchConfig, fetchResponse } from '../../helperFuncs';
import { genresUrl } from '../assets/genres';

export async function genres(type: 'movie' | 'tv'): Promise<Genres | null> {
    const { options } = fetchConfig('GET');
    const url = type === 'movie' ? genresUrl.movie : genresUrl.tv;

    const response = await fetchResponse<Genres>('get', url, options);
    // console.table(response?.genres)

    return response;
}
