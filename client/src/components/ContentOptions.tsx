'use client';

import movie from '@/assets/data/movie/genre.json';
import tv from '@/assets/data/tv/genre.json';
import { InputContext } from '@/context/SearchContext';
import usePreventBodyScroll from '@/hooks/usePreventBodyScroll';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

type Prop = {
    pathname: string;
};

const acceptedPaths = ['/movies', '/tv', '/genre', '/content'];

const ContentOptions = ({ pathname }: Prop) => {
    const [genres, setGenres] = useState<Genre[] | null>(null);
    const [type, setType] = useState<'movie' | 'tv' | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const searchInputContext = useContext(InputContext);
    usePreventBodyScroll(open);

    // Retrieve genres.
    const handleGenres = async (pathname: string) => {
        // Set correct type.
        const segments = pathname.split('/').filter(Boolean);
        const type = segments[0];

        if (type === 'genre' && segments[1]) {
            if (segments[1] === 'movies' || segments[1] === 'movie') {
                setType('movie');
                setGenres(movie.genres);
            }
            if (segments[1] === 'tv') {
                setType('tv');
                setGenres(tv.genres);
            }
        }

        if (type === 'content' && segments[1]) {
            if (segments[1] === 'movies' || segments[1] === 'movie') {
                setType('movie');
                setGenres(movie.genres);
            }
            if (segments[1] === 'tv') {
                setType('tv');
                setGenres(tv.genres);
            }
        }

        if (type === 'movies') {
            setType('movie');
            setGenres(movie.genres);
        }

        if (type === 'tv') {
            setType('tv');
            setGenres(tv.genres);
        }

        if (type === 'home') return;
    };

    // Rewrites the pathname with selected genre so it matches `acceptedPath`.
    const handlePath = (pathname: string) => {
        const pathnameList = pathname.split('/');
        if (pathnameList.includes('genre')) return '/genre';
        if (pathnameList.includes('content')) return '/content';
        return pathname;
    };

    useEffect(() => {
        handleGenres(pathname);
    }, [pathname]);

    return (
        <>
            <div
                className={`flex items-center text-sm px-2 py-[4px] lg:text-base 2xl:text-xl w-max border rounded-full md:border-none`}
            >
                <Link href={'/home'}>
                    <button>Home</button>
                </Link>
            </div>
            <div
                className={`flex items-center text-sm px-2 py-[4px] lg:text-base 2xl:text-xl w-max border rounded-full md:border-none`}
            >
                <Link href={'/tv'} onClick={() => searchInputContext?.setInput('')}>
                    <button>Series</button>
                </Link>
            </div>
            <div
                className={`flex items-center text-sm px-2 py-[4px] lg:text-base 2xl:text-xl w-max border rounded-full md:border-none`}
            >
                <Link href={'/movies'} onClick={() => searchInputContext?.setInput('')}>
                    <button>Movies</button>
                </Link>
            </div>
            {acceptedPaths.includes(handlePath(pathname)) && (
                <button
                    className={`flex items-center gap-1 text-sm px-2 py-[4px] lg:text-base 2xl:text-xl w-max border rounded-full md:border-none`}
                    onClick={() => setOpen(true)}
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
                            onClick={() => setOpen(false)}
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
                                        <Link href={`/genre/${type}/${genre.id}`}>
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
