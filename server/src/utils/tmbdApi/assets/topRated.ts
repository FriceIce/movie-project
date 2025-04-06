export function topRatedUrl(page: Page) {
    return {
        movie: `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}&region=US`,
        tv: `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}&region=US`,
    };
}
