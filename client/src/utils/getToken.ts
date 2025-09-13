import { cookies } from 'next/headers';
import { fetchJson } from './fetchJson';

/* 1. Send a condition to the backend that tells the server to not update the current refresh token.
   2. The condition should always be sent from this function. 
*/

export async function getToken(): Promise<string> {
    const cookieStore = cookies();
    const oldAccessToken = cookieStore.get('auth_token')?.value || '';
    const oldRefreshToken = cookieStore.get('refreshToken')?.value || '';
    let accessToken: string = '';

    if (!oldAccessToken && oldRefreshToken) {
        const tokenResponse = await fetchJson<FetchResponse<{ token: string }>>(
            '',
            '/refresh',
            'POST',
            { oldRefreshToken, checkDb: false }
        );

        // Set access token
        accessToken = tokenResponse.data.token;
    } else {
        accessToken = oldAccessToken;
    }

    return accessToken;
}

export default getToken;
