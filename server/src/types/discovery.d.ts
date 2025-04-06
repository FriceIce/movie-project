type Discovery = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
};

interface TVShow extends Movie {}
interface Recommendations extends Discovery {}
interface TopRated extends Discovery {}
interface Popular extends Discovery {}
interface Search extends Discovery {}
