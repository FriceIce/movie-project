type MediaType = 'movie' | 'tv' | 'person';

interface BaseMedia {
    adult: boolean;
    backdrop_path: string | null;
    id: number;
    overview: string;
    poster_path: string | null;
    media_type: MediaType;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    vote_average: number;
    vote_count: number;
}

interface MovieTrendingItem extends BaseMedia {
    media_type: 'movie';
    title: string;
    original_title: string;
    release_date: string;
    video: boolean;
}

interface TVShowItem extends BaseMedia {
    media_type: 'tv';
    name: string;
    original_name: string;
    first_air_date: string;
    origin_country: string[];
}

interface PersonItem extends BaseMedia {
    media_type: 'person';
}

type MediaItem = MovieTrendingItem | TVShowItem | PersonItem;
