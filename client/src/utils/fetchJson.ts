type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function fetchJson<T>(
    token: string,
    endpoint: string,
    method?: Method,
    body?: Record<string, any>
): Promise<T> {
    let protocol = 'http:';
    let hostname = 'localhost';

    // Protocol and hostname received by the windows.location object.
    if (typeof window !== 'undefined') {
        protocol = window.location.protocol;
        hostname = window.location.hostname;
    }

    const response = await fetch(`${protocol}//${hostname}:3001/api` + endpoint, {
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
