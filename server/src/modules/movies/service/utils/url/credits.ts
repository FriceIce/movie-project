export function creditsUrl(id: string, type: MovieOrTv) {
    return `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`;
}
