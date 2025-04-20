export function searchUrl(seachQuery: string) {
    const query = seachQuery.split(' ').join('%20');
    return {
        movie: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=1&region=US`,
        tv: `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=true&language=en-US&page=1&region=US`,
        keyword: `https://api.themoviedb.org/3/search/keyword?query=${query}&page=1`,
        person: `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`,
    };
}
