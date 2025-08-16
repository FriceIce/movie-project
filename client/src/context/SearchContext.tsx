'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

export type SearchContextType = {
    input: string | null;
    setInput: Dispatch<SetStateAction<string>>;
} | null;

export const InputContext = createContext<SearchContextType>(null);

function SearchContext({ children }: { children: ReactNode }) {
    const [input, setInput] = useState<string>('');

    return <InputContext.Provider value={{ input, setInput }}>{children}</InputContext.Provider>;
}

export default SearchContext;
