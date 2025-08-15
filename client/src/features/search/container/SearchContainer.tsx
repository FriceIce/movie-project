'use client';

import { debounce } from '@/utils/debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useCallback, useContext } from 'react';
import { InputContext } from '../SearchContext';

function SearchContainer() {
    const context = useContext(InputContext);

    const handleSearch = useCallback(
        debounce((searchTerm) => context?.setInput(searchTerm), 500), // 500ms delay
        []
    );

    return (
        <form className="px-1" onSubmit={(e) => e.preventDefault()}>
            <div className="flex items-center gap-1 bg-neutral-800 h-[50px] rounded-[2px] pl-2">
                <MagnifyingGlassIcon className="size-8 py-1 text-neutral-200" />
                <input
                    type="text"
                    placeholder="Search Movies and Shows"
                    className="bg-neutral-800 text-white text-sm rounded-[2px]-r w-full h-full px-1 placeholder-neutral-200 outline-none"
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                />
            </div>
        </form>
    );
}

export default SearchContainer;
