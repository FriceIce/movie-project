export function searchUrl(type: AllTypes, searchQuery: string) {
    const query = searchQuery.split(' ').join('%20');
    return `https://api.themoviedb.org/3/search/${type}?query=${query}&include_adult=true&language=en-US&page=1&region=US`;
}
