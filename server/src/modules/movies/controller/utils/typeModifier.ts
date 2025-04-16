/**
 * Converts the type value to a more readable representation.
 * @param type
 */
export function typeModifier(type: Type, singular?: boolean) {
    if (singular) return type === 'tv' ? 'TV show' : 'movie';
    return type === 'tv' ? 'TV shows' : 'movies';
}
