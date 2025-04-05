import { fetchConfig, fetchResponse } from '../helperFuncs';
import { discoveries } from './assets/discovery';

export async function discovery(
    type: 'movie' | 'tv',
    queryParam?: string[]
): Promise<Discovery | null> {
    const { options, query } = fetchConfig('GET', [], queryParam);
    const url = type === 'movie' ? discoveries.moviesUrl + query : discoveries.tvUrl + query;

    const response = await fetchResponse<Discovery>('get', url, options);
    return response;
}
