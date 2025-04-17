import { fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { searchUrl } from './utils/search';

/**
 * Retrieves search results for movies, TV, and keywords
 * @param type
 * @param queryText - User input
 * @returns
 */
export default async function search<T>(type: Type, queryText: string): Promise<T | null> {
    const { options } = fetchConfig('GET');

    const url = setSearchUrl(type, queryText);
    const response = await fetchResponse<Search>('get', url, options);

    if (response) response.results.sort((a, b) => b.popularity - a.popularity);

    return response as T;
}

/**
 * It sets the correct search url.
 * @param type
 * @param queryText
 * @returns
 */
function setSearchUrl(type: Type, queryText: string): string {
    switch (type) {
        case 'movie':
            return searchUrl(queryText).movie;

        case 'keyword':
            return searchUrl(queryText).keyword;

        case 'person':
            return searchUrl(queryText).person;

        default: // tv
            return searchUrl(queryText).tv;
    }
}
