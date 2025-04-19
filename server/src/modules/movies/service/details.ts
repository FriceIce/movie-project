import { CustomError } from '../../../utils/error/errorClasses';
import { baseImageUrl, fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { typeModifier } from '../controller/utils/typeModifier';
import { detailsUrl } from './utils/details';

/**
 * Retrieves an object containg movie details.
 * @param {string} id
 */
export default async function details(type: Type, id: string): Promise<MovieDetail.Response> {
    const { options } = fetchConfig('GET', [id]);
    const url = type === 'movie' ? detailsUrl(id).movie : detailsUrl(id).tv;

    const response = await fetchResponse<MovieDetail.Response>('get', url, options);

    const modifiedType = typeModifier(type, true);
    if (!response) {
        throw new CustomError.NotFoundError(`No details found for ${modifiedType} with id ${id}`);
    }

    // Ensures that the poster_path property gets the full image url
    response.poster_path = baseImageUrl(response.poster_path);

    return response;
}
