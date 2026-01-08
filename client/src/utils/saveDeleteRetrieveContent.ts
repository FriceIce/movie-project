import { Dispatch, SetStateAction } from 'react';
import { fetchJson } from './fetchJson';
import Cookie from 'js-cookie';
import { url } from './url';

const refreshToken = Cookie.get('refreshToken');
const errormessage = `We couldn't save this content. Please try again or reload the page.`;

type Body = {
    title: string;
    contentId: string;
    contentType: 'movie' | 'tv';
    images: { posterPath: string; backdropPath: string };
};

export async function saveContent(
    token: string,
    props: Body,
    setSave: Dispatch<SetStateAction<Record<string, string | boolean>>>,
    setSavedTitles: Dispatch<SetStateAction<SavedContent[]>>
): Promise<boolean> {
    const origin: string = url();
    const response = await fetch(`${origin}/api/saveContent`, {
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
            saveContent(accessToken.data.token, props, setSave, setSavedTitles);
            return false;
        }
        alert(errormessage);
        return false;
    }

    // Set the save state to true
    setSave((prev) => ({
        ...prev,
        [props.contentId]: true,
    }));

    // Add the content to the list
    const content = {
        title: props.title,
        content_id: Number(props.contentId),
        content_type: props.contentType,
        poster_path: props.images.posterPath,
        backdrop_path: props.images.backdropPath,
    };
    setSavedTitles((prev) => [{ ...content }, ...prev]);

    // Returns true if the response is ok.
    return true;
}

export async function deleteSavedContent(
    token: string,
    contentId: string,
    setSave: Dispatch<SetStateAction<Record<string, string | boolean>>>,
    setSavedTitles: Dispatch<SetStateAction<SavedContent[]>>
): Promise<boolean> {
    const origin: string = url();
    const response = await fetch(`${origin}/api/saveContent/${contentId}`, {
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

            deleteSavedContent(accessToken.data.token, contentId, setSave, setSavedTitles);
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

    // Removes content from the list.
    setSavedTitles((prev) => prev.filter((title) => title.content_id !== Number(contentId)));

    // Returns true if the response is ok.
    return true;
}

// Retrieve content
export async function retrieveSavedContent(
    token: string
): Promise<FetchResponse<SavedContent[]> | null> {
    const origin: string = url();
    const response = await fetch(`${origin}/api/saveContent/`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    });

    if (!response.ok) {
        return null;
    }

    return await response.json();
}
