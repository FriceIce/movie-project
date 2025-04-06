type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type RequestOptions = {
    method: Method;
    headers: {
        accept: string;
        Authorization: string;
    };
};

// TMBD api page type.
type Page = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
type Type = 'movie' | 'tv';
