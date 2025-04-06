export function popularUrl(page: Page) {
    return {
        movie: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
        tv: `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
    };
}
