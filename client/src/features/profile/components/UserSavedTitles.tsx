'use client';

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
        <section className="space-y-2 mt-8 px-2">
            <h1 className="font-semibold text-2xl">My List</h1>
            <RenderSavedTitles titles={titlesToRender} />
        </section>
    );
}

export default UserSavedTitles;

function RenderSavedTitles({ titles }: { titles: SavedContent[] | undefined }) {
    if (!titles || titles.length === 0)
        return <p className="text-neutral-500 mx-6">No saved titles yet.</p>;
    return (
        <ul className="card-grid-auto-fill">
            {titles?.map((title, i) => {
                return (
                    <li key={i} className="h-[183px]">
                        <Link href={`/content/${title.content_type}/${title.content_id}`}>
                            <Image
                                src={`https://image.tmdb.org/t/p/w500/${title.poster_path}`}
                                alt={title.content_type + ' content.'}
                                width={500}
                                height={750}
                                className="h-full"
                            />
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
