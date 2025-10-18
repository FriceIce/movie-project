import { cookies } from 'next/headers';
import { fetchJson } from './fetchJson';

async function getUserInfo() {
    const cookieStore = cookies();
    const oldAccessToken = cookieStore.get('auth_token')?.value || '';
    const oldRefreshToken = cookieStore.get('refreshToken')?.value || '';
    let user: Pick<User, 'email' | 'username'> | null = null;

    if (!oldAccessToken && oldRefreshToken) {
        const tokenResponse = await fetchJson<FetchResponse<{ token: string }>>(
            '',
            '/refresh',
            'POST',
            { oldRefreshToken, checkDb: false }
        );

        // Set access token
        const accessToken = tokenResponse.data.token;
        user = await fetchUserInfo(accessToken);
    } else if (oldAccessToken) {
        user = await fetchUserInfo(oldAccessToken);
    }

    return user;
}

export default getUserInfo;

async function fetchUserInfo(accessToken: string) {
    const user = await fetchJson<FetchResponse<{ username: string; email: string }>>(
        accessToken,
        '/me'
    );
    return user.data;
}
