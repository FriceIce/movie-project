// Replaces '-' in movie and tv show titles.
export function normalize(str: string) {
    return str.toLowerCase().replace(/[-\s]/g, '');
}
