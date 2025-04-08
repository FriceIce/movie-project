import { fetchConfig, fetchResponse } from '../../helperFuncs';
import { searchUrl } from './assets/search';

/**
 * Retrieves search results for movies, TV, and keywords
 * @param type
 * @param queryText - User input
 * @returns
 */
export default async function search(type: Type, queryText: string): Promise<Search | null> {
    const { options } = fetchConfig('GET');

    const url = setSearchUrl(type, queryText);
    const response = await fetchResponse<Search>('get', url, options);

    if (response) response.results.sort((a, b) => b.popularity - a.popularity);

    return response;
}

function setSearchUrl(type: Type, queryText: string) {
    switch (type) {
        case 'movie':
            return searchUrl(queryText).movie;

        case 'keyword':
            return searchUrl(queryText).keyword;

        default: // tv
            return searchUrl(queryText).tv;
    }
}
