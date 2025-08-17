'use client';
import { SearchContextType } from '@/context/SearchContext';
import useDebounce from '@/hooks/useDebounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { Dispatch, useEffect } from 'react';

type Props = {
    inputContext: SearchContextType;
    desktopView: boolean;
    openInputField: boolean;
    setOpenInputField: Dispatch<React.SetStateAction<boolean>>;
};

function DesktopInputfield(props: Props) {
    const { inputContext, openInputField, setOpenInputField, desktopView } = props;
    const handleSearch = useDebounce(inputContext);

    useEffect(() => {
        // Clears the input when the user closes it or changes screen width to 768px and above.
        if (!openInputField || !desktopView) inputContext?.setInput('');
    }, [openInputField, desktopView, inputContext]);

    return (
        <div
            className={`flex p-1 items-center ${openInputField ? 'bg-custom-black border transition-all duration-300' : 'border-none bg-transparent transition-none'}`}
        >
            <button onClick={() => setOpenInputField((prev) => !prev)}>
                <MagnifyingGlassIcon className="size-7" />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ${
                    openInputField ? 'max-w-xs opacity-100' : 'max-w-0 opacity-0'
                }`}
            >
                <input
                    type="text"
                    placeholder="Movies, series"
                    className="w-full bg-transparent outline-none px-2 placeholder-neutral-300"
                    onChange={(e) => handleSearch(e.target.value.trim())}
                />
            </div>
        </div>
    );
}

export default DesktopInputfield;
