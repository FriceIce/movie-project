type RegisterUser = {
    id: number;
    username: string;
    email: string;
    password: string;
};

type LoginUser = {
    email: string;
    password: string;
};

type SaveMovie = {
    content_id: number;
    title: string;
    description: string;
};
