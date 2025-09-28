import { cookies } from 'next/headers';
import { fetchJson } from './fetchJson';

async function getUsername() {
    const cookieStore = cookies();
    const oldAccessToken = cookieStore.get('auth_token')?.value || '';
    const oldRefreshToken = cookieStore.get('refreshToken')?.value || '';
    let username = '';

    if (!oldAccessToken && oldRefreshToken) {
        const tokenResponse = await fetchJson<FetchResponse<{ token: string }>>(
            '',
            '/refresh',
            'POST',
            { oldRefreshToken, checkDb: false }
        );

        // Set access token
        const accessToken = tokenResponse.data.token;
        username = await fetchUsername(accessToken);
    } else {
        username = await fetchUsername(oldAccessToken);
    }

    return username;
}

export default getUsername;

async function fetchUsername(accessToken: string) {
    const user = await fetchJson<FetchResponse<{ username: string }>>(accessToken, '/me');
    return user.data.username;
}
