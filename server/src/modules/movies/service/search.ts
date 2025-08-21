import { CustomError } from '../../../error/errorClasses';
import { fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { typeModifier } from '../controller/utils/typeModifier';
import { pathModifier } from './utils/pathModifier';
import { searchUrl } from './utils/url/search';

/**
 * Retrieves search results for movies, TV, and keywords
 *
 * A keyword can be:
 * - `genre` --> `Action comedy`, `sports documentary` etc
 * - `theme` --> `Space`, `nature` etc
 * - `subjects` --> `human rights`, `climate change` etc
 * - `history` --> `world war II` `civil rights movement`
 *
 * @param type The type of content (movie, TV, or keyword).
 * @param queryText - The user search query.
 * @returns {Promise<T>}
 * @throws {NotFoundError} If no results are found.
 */
export default async function search<T>(type: AllTypes, queryText: string): Promise<T> {
    const { options } = fetchConfig('GET');
    const url = searchUrl(type, queryText);
    const response = await fetchResponse<Search>('get', url, options);

    // Check if the response is null or empty.
    const modifiedType = typeModifier(type);
    if (!response || response.results.length === 0) {
        throw new CustomError.NotFoundError(
            `No search results found for ${modifiedType} with search query "${queryText}"`
        );
    }

    if (response) response.results.sort((a, b) => b.popularity - a.popularity);

    // Ensures that the poster_path values inside `response.results` get the full image URL
    // pathModifier(response.results as Movie[]);

    return response as T;
}

// /**
//  * It sets the correct search url.
//  * @param type
//  * @param queryText
//  * @returns
//  */
// function setSearchUrl(type: AllTypes, queryText: string): string {
//     switch (type) {
//         case 'movie':
//             return searchUrl(queryText).movie;

//         case 'keyword':
//             return searchUrl(queryText).keyword;

//         case 'person':
//             return searchUrl(queryText).person;

//         default: // tv
//             return searchUrl(queryText).tv;
//     }
// }
