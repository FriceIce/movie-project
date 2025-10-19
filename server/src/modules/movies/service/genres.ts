import { cache } from '../../../config/cache';
import { CustomError } from '../../../error/errorClasses';
import { fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { genresUrl } from './utils/url/genres';

/**
 * Retrieves a list of genres for movies or TV shows.
 *
 * @param {AllTypes} type - The type of content ('movie' or 'tv').
 * @returns {Promise<Genres>} A promise that resolves to an object containg a list of genres.
 * @throws {NotFoundError} If no genres are found.
 */
export default async function genres(type: AllTypes): Promise<Genres> {
    const cached = cache.get<Genres>(`genre/${type}`);
    if (cached) return cached;

    const { options } = fetchConfig('GET');
    const url = type === 'movie' ? genresUrl.movie : genresUrl.tv;

    const response = await fetchResponse<Genres>('get', url, options);

    if (!response || response.genres.length === 0)
        throw new CustomError.NotFoundError('No genres found.');

    // Set cache
    cache.set('genre/', type);

    return response;
}
