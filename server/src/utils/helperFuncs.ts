import axios from 'axios';
import { tmbdApiKey } from '../config/tmbd';

/**
 * Adjusts the parameter if there is any and configures the method/headers.
 * @param {Method} method
 * @param {string[]} parameters
 * @returns
 */
export function fetchConfig(method: Method, parameters?: string[], queryParam?: string[]) {
    const params =
        parameters && parameters.length > 0
            ? parameters
                  .map((value, i) => {
                      if (i == 0) return `${value}`;
                      return `/${value}`;
                  })
                  .join()
            : '';
    parameters;

    const query =
        queryParam && queryParam.length > 0 ? queryParam.map((value) => `&${value}`).join('&') : '';

    const options: RequestOptions = {
        method,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + tmbdApiKey,
        },
    };

    return { options, params, query };
}

/**
 * This function uses the axios npm package to fetch data.
 * @param method
 * @param {string} url
 * @param {RequestOptions} options
 * @returns
 */

export async function fetchResponse<T>(
    method: 'get' | 'post',
    url: string,
    options: RequestOptions
): Promise<T | null> {
    try {
        const response = await axios[method]<T>(url, options);
        return response.data;
    } catch (e) {
        console.warn('Failed to fetch:', e);
        return null;
    }
}
