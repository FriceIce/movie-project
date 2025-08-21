'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

export type SearchContextType = {
    input: string | null;
    setInput: Dispatch<SetStateAction<string>>;
    searchResults: MediaItem[];
    setSearchResults: Dispatch<SetStateAction<MediaItem[]>>;
    error: number | null;
    setError: Dispatch<SetStateAction<number | null>>;
} | null;

export const InputContext = createContext<SearchContextType>(null);

function SearchContext({ children }: { children: ReactNode }) {
    const [input, setInput] = useState<string>('');
    const [searchResults, setSearchResults] = useState<MediaItem[]>([]);
    const [error, setError] = useState<number | null>(null);

    return (
        <InputContext.Provider
            value={{ input, setInput, setSearchResults, searchResults, error, setError }}
        >
            {children}
        </InputContext.Provider>
    );
}

export default SearchContext;
