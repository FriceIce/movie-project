type MovieItem<T> = {
    page: number;
    results: T;
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

type ProductionCompany = {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
};

type TvShow = {
    adult: boolean;
    backdrop_path: string | null;
    id: number;
    name: string;
    original_name: string;
    overview: string;
    poster_path: string | null;
    media_type?: string;
    original_language: string;
    genre_ids: number[];
    first_air_date?: string;
    origin_country?: string[];
    popularity?: number;
    vote_average?: number;
    vote_count?: number;
};

// TMDB recommendations
type Recommendations = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};
