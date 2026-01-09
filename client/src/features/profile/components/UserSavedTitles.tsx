'use client';

import { poppins } from '@/assets/fonts';
import { useSaveContent } from '@/context/SaveContentContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type Props = {
    storedTitles: SavedContent[] | undefined;
};

function UserSavedTitles({ storedTitles }: Props) {
    const { savedTitles } = useSaveContent();
    const [titlesToRender, setTitlesToRender] = useState<SavedContent[] | undefined>(
        savedTitles.length !== 0 ? savedTitles : storedTitles
    );
    const firstRender = useRef(true);

    useEffect(() => {
        // Prevents the state to render twice by exiting early on the first render.
        if (firstRender) {
            firstRender.current = false;
            return;
        }
        setTitlesToRender(savedTitles);
    }, [savedTitles]);

    return (
        <section className="space-y-2 md:space-y-4 px-2">
            <h1 className={`font-semibold text-2xl md:text-4xl ${poppins.className}`}>My List</h1>
            <RenderSavedTitles titles={titlesToRender} />
        </section>
    );
}

export default UserSavedTitles;

function RenderSavedTitles({ titles }: { titles: SavedContent[] | undefined }) {
    if (!titles || titles.length === 0)
        return <p className="text-neutral-500 mx-6">No saved titles yet.</p>;
    return (
        <ul className="card-grid">
            {titles?.map((title) => {
                return (
                    <li key={title.content_id} className="relative shadow-blackShadow">
                        <Link
                            href={`/content/${title.content_type}/${title.content_id}`}
                            prefetch={false}
                        >
                            <div className="relative size-full">
                                <div className="absolute inset-0 size-full md:hover:bg-[#0000002f]"></div>
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500/${title.poster_path}`}
                                    alt={title.content_type + ' content.'}
                                    width={342}
                                    height={513}
                                    className="size-full"
                                />
                            </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
