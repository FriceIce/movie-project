import { CustomError } from '../../../error/errorClasses';
import { baseImageUrl, fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { typeModifier } from '../controller/utils/typeModifier';
import { detailsUrl } from './utils/url/details';

/**
 * Retrieves movie or TV show details based on the provided ID.
 *
 * The function prepares a GET request using the given content type (`movie` or `tv`) and ID.
 * It then attempts to fetch the content details.
 *
 * If the response is `null`, it throws a `NotFoundError`.
 *
 * If a valid response is returned, the function modifies the `poster_path` field (if not null),
 * replacing it with the full image URL.
 *
 * @param {string} id - The content ID to fetch details for.
 * @param {AllTypes} type - The type of content, either 'movie' or 'tv'.
 * @returns {Promise<MovieDetail.Response>} The details of the specified movie or TV show.
 * @throws {NotFoundError} If no data is found for the given ID.
 */
export default async function details(type: AllTypes, id: string): Promise<MovieDetail.Response> {
    const { options } = fetchConfig('GET', [id]);
    const url = type === 'movie' ? detailsUrl(id).movie : detailsUrl(id).tv;

    const response = await fetchResponse<MovieDetail.Response>('get', url, options);

    const modifiedType = typeModifier(type, true);
    if (!response) {
        throw new CustomError.NotFoundError(`No details found for ${modifiedType} with id ${id}`);
    }

    // Ensures that the poster_path property gets the full image url
    // response.poster_path = baseImageUrl(response.poster_path);

    return response;
}
