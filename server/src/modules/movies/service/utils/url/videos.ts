export function videosUrl(id: string, type: MovieOrTv) {
    return `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`;
}
