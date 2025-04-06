import { fetchConfig, fetchResponse } from '../../helperFuncs';
import { popularUrl } from '../assets/popular';

export default async function popular(type: Type, page: Page) {
    const { options } = fetchConfig('GET');
    const url = type === 'movie' ? popularUrl(page).movie : popularUrl(page).tv;
    const response = await fetchResponse('get', url, options);
    return response;
}
