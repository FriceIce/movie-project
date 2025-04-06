export function searchUrl(seachQuery: string) {
    const query = seachQuery.split(' ').join('%20');
    console.log(query);
    return {
        movie: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=1&region=US`,
        tv: `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=true&language=en-US&page=1&region=US`,
    };
}
