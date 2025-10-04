'use client';

import { usePathname } from 'next/navigation';
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';

export type SearchContextType = {
    input: string | null;
    setInput: Dispatch<SetStateAction<string>>;
    searchResults: MediaItem[];
    setSearchResults: Dispatch<SetStateAction<MediaItem[]>>;
    error: number | null;
    setError: Dispatch<SetStateAction<number | null>>;
};

export const InputContext = createContext<SearchContextType | null>(null);

function SearchContext({ children }: { children: ReactNode }) {
    const [input, setInput] = useState<string>('');
    const [searchResults, setSearchResults] = useState<MediaItem[]>([]);
    const [error, setError] = useState<number | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        setInput('');
    }, [pathname]);

    return (
        <InputContext.Provider
            value={{ input, setInput, setSearchResults, searchResults, error, setError }}
        >
            {children}
        </InputContext.Provider>
    );
}

export default SearchContext;

export function useSearchContext() {
    const search = useContext(InputContext);

    if (!search) throw new Error(`You need to call this context in a 'use client component.`);

    return search;
}
