type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type RequestOptions = {
    method: Method;
    headers: {
        accept: string;
        Authorization: string;
    };
};
