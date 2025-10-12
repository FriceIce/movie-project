import { Dispatch, SetStateAction } from 'react';
import { fetchJson } from './fetchJson';
import Cookie from 'js-cookie';

const refreshToken = Cookie.get('refreshToken');
const errormessage = `We couldn't save this content. Please try again or reload the page.`;

type Body = {
    contentId: string;
    contentType: string;
    images: { posterPath: string; backdropPath: string };
};

export async function saveContent(
    token: string,
    props: Body,
    setSave: Dispatch<SetStateAction<Record<string, string | boolean>>>
): Promise<boolean> {
    const response = await fetch(`http://localhost:3001/api/saveContent`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(props),
    });

    if (!response.ok) {
        if (response.status === 401) {
            const accessToken = await fetchJson<FetchResponse<{ token: string }>>(
                '',
                '/refresh',
                'POST',
                { oldRefreshToken: refreshToken }
            );
            saveContent(accessToken.data.token, props, setSave);
            return false;
        }
        alert(errormessage);
        return false;
    }

    console.log('saving content', props.contentId);

    // Set the save state to true
    setSave((prev) => ({
        ...prev,
        [props.contentId]: true,
    }));

    // Returns true if the response is ok.
    return true;
}

export async function deleteSavedContent(
    token: string,
    contentId: string,
    setSave: Dispatch<SetStateAction<Record<string, string | boolean>>>
): Promise<boolean> {
    const response = await fetch(`http://localhost:3001/api/saveContent/${contentId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            const accessToken = await fetchJson<FetchResponse<{ token: string }>>(
                '',
                '/refresh',
                'POST',
                { oldRefreshToken: refreshToken }
            );

            deleteSavedContent(accessToken.data.token, contentId, setSave);
            return false;
        }
        alert(errormessage);
        return false;
    }

    // Set the save state to true
    setSave((prev) => ({
        ...prev,
        [contentId]: false,
    }));

    // Returns true if the response is ok.
    return true;
}

// Retrieve content
export async function retrieveSavedContent(
    token: string
): Promise<FetchResponse<SavedContent[]> | null> {
    const response = await fetch(`http://localhost:3001/api/saveContent/`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    });

    if (!response.ok) {
        return null;
    }

    return response.json() as Promise<FetchResponse<SavedContent[]>>;
}
