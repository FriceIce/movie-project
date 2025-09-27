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

type UserData = Pick<RegisterUser, 'email' | 'username'>;

type SavedContent = {
    contentId: number;
    contentType: 'movie' | 'tv';
    images: { posterPath: string; backdropPath: string };
};

interface JwtPayloadWithId extends jwt.JwtPayload {
    id: string;
}

type RefreshTokenTable = {
    user_id: number;
    refresh_token: string;
    created_at: string;
    expires_at: string;
};
