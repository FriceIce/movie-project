export function sortByVote(array: Movie[] | TvShow[]): Movie[] | TvShow[] {
    return array.sort((a, b) => {
        if (!a.vote_count || !b.vote_count) return -1;
        return b.vote_count - a.vote_count;
    });
}
