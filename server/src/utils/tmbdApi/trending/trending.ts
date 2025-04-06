import { fetchConfig, fetchResponse } from '../../helperFuncs';
import { trendingUrl } from '../assets/trending';

export default async function trending(type: Type): Promise<Trending | null> {
    const { options } = fetchConfig('GET');
    const url = type === 'movie' ? trendingUrl.movie : trendingUrl.tv;
    const response = await fetchResponse<Trending>('get', url, options);
    return response;
}
