/**
 * Converts the type value to a more readable representation.
 *
 * @param {Type} type - The type of content (e.g., 'tv' or 'movie').
 * @param {boolean} [singular] - Whether the returned string should be singular. Defaults to plural.
 * @returns {string} A modified string more suitable for a client-facing response.
 */
export function typeModifier(type: Type, singular?: boolean): string {
    if (singular) return type === 'tv' ? 'TV show' : 'movie';
    return type === 'tv' ? 'TV shows' : 'movies';
}
