type DisplayArrow = { left: boolean; right: boolean };

// FilterTmdbVideos.ts
type TmdbVideoObject = {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
};

type FilteredVideos = {
    trailer: TmdbVideoObject | null;
    all: TmdbVideoObject[];
};

// ----------------------------------------------
