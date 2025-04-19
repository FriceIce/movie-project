/**
 * Converts an Express request `query` object into a format compatible with TMDB service functions.
 *
 * If the `query` object is valid, it iterates over its properties and builds a list of strings
 * in the format `key=value`, which are then returned as an array.
 *
 * If the `query` is null, an empty array is returned.
 *
 * @param query
 * @returns { string[] } An array of strings representing query parameters in `key=value` format.
 */

export function queryModifier(query: { [key: string]: unknown } | null): string[] {
    const queryList: string[] = [];

    if (query) {
        for (const property in query) {
            queryList.push(`${property}=${query[property]}`);
        }
        return queryList;
    }

    return [];
}
