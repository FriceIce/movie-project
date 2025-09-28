'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

type SaveContentType = {
    saveBtn: Record<string, string | boolean>;
    setSaveBtn: Dispatch<SetStateAction<Record<string, string | boolean>>>;
};

type Props = {
    children: ReactNode;
};

const SaveContent = createContext<SaveContentType | null>(null);

function SaveContentContext({ children }: Props) {
    const [saveBtn, setSaveBtn] = useState<Record<string, string | boolean>>({});
    return <SaveContent.Provider value={{ saveBtn, setSaveBtn }}>{children}</SaveContent.Provider>;
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
