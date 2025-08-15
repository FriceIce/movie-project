'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type SearchContextType = {
    input: string | null;
    setInput: Dispatch<SetStateAction<string | null>>;
} | null;

export const InputContext = createContext<SearchContextType>(null);

function SearchContext({ children }: { children: ReactNode }) {
    const [input, setInput] = useState<string | null>(null);

    return <InputContext.Provider value={{ input, setInput }}>{children}</InputContext.Provider>;
}

export default SearchContext;
