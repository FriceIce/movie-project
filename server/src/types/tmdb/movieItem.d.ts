type MovieItem = {
    page: number;
    results: Movie[] | Actor[];
    total_pages: number;
    total_results: number;
};

type Movie = {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

type Actor = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    known_for: Movie[];
};

type Keyword = {
    id: number;
    name: string;
};

type SearchKeyword = Omit<MovieItem, 'results'> & { results: Keyword[] };

type Genres = {
    genres: Genre[];
};

type Genre = {
    id: number;
    name: string;
};

interface Discovery extends MovieItem {}
interface Recommendations extends MovieItem {}
interface TopRated extends MovieItem {}
interface Popular extends MovieItem {}
interface Search extends MovieItem {}
interface Trending extends MovieItem {}
