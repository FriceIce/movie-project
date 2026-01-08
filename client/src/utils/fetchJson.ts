import { url } from './url';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function fetchJson<T>(
    token: string,
    endpoint: string,
    method?: Method,
    body?: Record<string, any>
): Promise<T> {
    const origin: string = url();

    const response = await fetch(`${origin}/api` + endpoint, {
        ...(method && { method }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        credentials: 'include',
        ...(body && method !== 'GET' && { body: JSON.stringify(body) }),
        next: {
            revalidate: 60,
        },
    });

    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response.json() as Promise<T>;
}
