type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type RequestOptions = {
    method: Method;
    headers: {
        accept: string;
        Authorization: string;
    };
};

// TMBD api
type Page = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
type PosterSize = '92' | '154' | '185' | '342' | '500';
type Type = 'movie' | 'tv' | 'keyword' | 'person';

// Validator func type
type Validator =
    | 'type'
    | 'id'
    | 'page'
    | 'login'
    | 'register'
    | 'saveContent'
    | 'chat'
    | 'query'
    | 'authentication'
    | 'authorization';

type ValidatorFunc = RunnableValidationChains<ValidationChain> | Function;
