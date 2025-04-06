export function recommendationsUrl(id: string, page: Page) {
    return {
        movie: `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=${page}`,
        tv: `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=${page}`,
    };
}
