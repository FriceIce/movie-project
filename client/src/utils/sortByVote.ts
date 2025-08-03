export function sortByVote(array: Movie[]): Movie[] {
    return array.sort((a, b) => b.vote_count - a.vote_count);
}
