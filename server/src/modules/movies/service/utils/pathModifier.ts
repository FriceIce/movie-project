import { baseImageUrl } from '../../../../utils/helperFuncs';

/**
 * Modifies the `poster_path` property of each movie in the array by prepending the base image URL.
 *
 * @param {Movie[]} results - An array of movie objects to update.
 * @returns {void}
 */
export function pathModifier(results: Movie[]): void {
    results.forEach((content) => {
        if (content.poster_path) content.poster_path = baseImageUrl(content.poster_path);
        if (content.backdrop_path) content.backdrop_path = baseImageUrl(content.backdrop_path);
    });
}
