import { CustomError } from '../../../utils/error/errorClasses';
import { fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { typeModifier } from '../controller/utils/typeModifier';
import { topRatedUrl } from './utils/topRated';

/**
 * @param { Type } type The type of content to retrieve
 * @param { Page } page The page to retrieve
 * @returns
 */
export default async function topRated(type: Type, page: Page): Promise<TopRated> {
    const { options } = fetchConfig('GET');
    const url = type === 'movie' ? topRatedUrl(page).movie : topRatedUrl(page).tv;
    const response = await fetchResponse<TopRated>('get', url, options);

    const modifiedType = typeModifier(type);
    if (!response || response.results.length === 0) {
        throw new CustomError.NotFoundError(`No top rated ${modifiedType} found.`);
    }

    return response;
}
