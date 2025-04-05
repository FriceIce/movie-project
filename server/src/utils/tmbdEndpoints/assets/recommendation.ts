export function recommendationsUrl(id: string, page: Page) {
    return {
        movieUrl: `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=${page}`,
        tvUrl: `'https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=${page}`,
    };
}
