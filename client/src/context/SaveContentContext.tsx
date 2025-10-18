'use client';
import { retrieveSavedContent } from '@/utils/saveDeleteRetrieveContent';
import Cookies from 'js-cookie';
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';

type SaveContentType = {
    saveBtn: Record<string, string | boolean>;
    setSaveBtn: Dispatch<SetStateAction<Record<string, string | boolean>>>;
    savedTitles: SavedContent[];
    setSavedTitles: Dispatch<SetStateAction<SavedContent[]>>;
};

type Props = {
    children: ReactNode;
};

const SaveContent = createContext<SaveContentType | null>(null);

function SaveContentContext({ children }: Props) {
    const [saveBtn, setSaveBtn] = useState<Record<string, string | boolean>>({});
    const [savedTitles, setSavedTitles] = useState<SavedContent[]>([]);

    useEffect(() => {
        const fetchSavedTitles = async () => {
            const accessToken = Cookies.get('auth_token') ?? '';
            const savedMedia = await retrieveSavedContent(accessToken);

            if (!savedMedia) return [];

            setSavedTitles(savedMedia.data);
        };

        fetchSavedTitles();
    }, []);

    return (
        <SaveContent.Provider value={{ saveBtn, setSaveBtn, savedTitles, setSavedTitles }}>
            {children}
        </SaveContent.Provider>
    );
}

export default SaveContentContext;

// Private hook that throws an Error if the context is null.
export function useSaveContent() {
    const context = useContext(SaveContent);

    if (!context) {
        throw new Error('useSaveContent can only exist inside a client component.');
    }

    return context;
}
