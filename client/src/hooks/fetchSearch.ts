import { url } from '@/utils/url';

export async function fetchSearch<T>(token: string, searchTerm: string): Promise<T | number> {
    const origin: string = url();

    const response = await fetch(origin + '/api/search/multi?query=' + searchTerm, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        if (response.status === 404) return response.status;
        throw Error('We’re sorry, but we couldn’t retrieve the content for this page.');
    }

    return (await response.json()) as Promise<T>;
}
