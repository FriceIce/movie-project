'use client';

import usePreventBodyScroll from '@/hooks/usePreventBodyScroll';
import { fetchJson } from '@/utils/fetchJson';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Prop = {
    pathname: string;
};

const acceptedPaths = ['/movies', '/tv', '/genre'];

const ContentOptions = ({ pathname }: Prop) => {
    const [genres, setGenres] = useState<Genre[] | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    usePreventBodyScroll(open);

    // Retrieve genres.
    const fetchGenres = async (pathname: string) => {
        const token = process.env.NEXT_PUBLIC_SERVER_TOKEN as string;

        // Set correct type.
        const segments = pathname.split('/').filter(Boolean);
        let type = segments[0];

        if (type === 'genre' && segments[1]) type = segments[1];
        if (type === 'movies') type = 'movie';
        if (type === 'home') return;

        const response = await fetchJson<FetchResponse<{ genres: Genre[] }>>(
            token,
            `/genres/${type}`
        );
        setGenres(response.data.genres);
    };

    useEffect(() => {
        console.log(genres);
        if (genres) return;

        // fetchGenres(pathname);
    }, [genres, setGenres, pathname]);

    return (
        <>
            <div className={`flex items-center px-3 py-1 w-max border rounded-full md:border-none`}>
                <Link href={'/tv'}>
                    <button>Series</button>
                </Link>
            </div>
            <div className={`flex items-center px-3 py-1 w-max border rounded-full md:border-none`}>
                <Link href={'/movies'}>
                    <button>Movies</button>
                </Link>
            </div>
            {acceptedPaths.includes(pathname) && (
                <button
                    className={`flex items-center gap-1 px-3 py-1 w-max border rounded-full md:border-none`}
                    onClick={() => setOpen((prev) => !prev)}
                >
                    Categories
                </button>
            )}

            {/* All the genres */}

            {genres && open && (
                <div className="fixed inset-0 z-[5] bg-[#171717ea] flex flex-row-reverse h-dvh w-dvw">
                    <div className="relative w-full h-full">
                        <button
                            className="absolute top-4 right-5 lg:right-7 size-7"
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            <XMarkIcon className="size-7 lg:size-9 border rounded-full" />
                        </button>
                        <ul className="flex-1 flex flex-col justify-between items-center gap-4 h-full lg:text-2xl overflow-y-auto p-4">
                            <li key="all" className="">
                                <Link href={`/home`}>
                                    <button className="" onClick={() => setOpen(false)}>
                                        All
                                    </button>
                                </Link>
                            </li>
                            {genres.map((genre) => {
                                return (
                                    <li key={genre.id} className="">
                                        <Link href={`/genre${pathname}/${genre.id}`}>
                                            <button className="" onClick={() => setOpen(false)}>
                                                {genre.name}
                                            </button>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContentOptions;
