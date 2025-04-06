import { fetchConfig, fetchResponse } from '../../helperFuncs';
import { searchUrl } from '../assets/search';

export default async function search(type: Type, queryText: string) {
    const { options } = fetchConfig('GET');
    const url = type === 'movie' ? searchUrl(queryText).movie : searchUrl(queryText).tv;
    const response = await fetchResponse<Search>('get', url, options);

    if (response) response.results.sort((a, b) => b.popularity - a.popularity); // sort by popularity in desc

    console.log(response);
    return response;
}
