'use client';

import useDebounce from '@/hooks/useDebounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useContext, useEffect, useRef } from 'react';
import { InputContext } from '../../../context/SearchContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useRouter } from 'next/navigation';

function SearchContainer() {
    const context = useContext(InputContext);
    const handleSearch = useDebounce(context);
    const desktopView = useMediaQuery(768);
    const firstRenderDone = useRef<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (!firstRenderDone.current) firstRenderDone.current = true;

        // In case the user changes the screen width to 768px and above.
        if (desktopView && firstRenderDone) {
            context?.setInput('');
            router.push('/');
        }
    }, [desktopView, router, context]);

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
