export function detailsUrl(id: string) {
    return {
        movie: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        tv: `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
    };
}
