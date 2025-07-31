type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function fetchJson<T>(
    token: string,
    endpoint: string,
    method?: Method,
    body?: Record<string, any>
): Promise<T> {
    const response = await fetch('http://localhost:3001/api' + endpoint, {
        ...(method && { method }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        ...(body && method !== 'GET' && { body: JSON.stringify(body) }),
        next: {
            revalidate: 60,
        },
    });

    if (!response.ok)
        throw Error('We’re sorry, but we couldn’t retrieve the content for this page.');

    return response.json() as Promise<T>;
}
