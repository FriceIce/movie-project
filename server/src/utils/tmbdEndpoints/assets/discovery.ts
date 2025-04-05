export function discoveries(page: Page) {
    return {
        moviesUrl: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
        tvUrl: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    };
}
