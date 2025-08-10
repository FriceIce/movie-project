'use client';
import { poppins } from '@/assets/fonts';
import usePreventBodyScroll from '@/hooks/usePreventBodyScroll';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

type Prop = {
    label?: string;
    director?: string | string[];
    contentDetails: MovieDetails | TvShowDetails;
    cast: CastMember[];
    crew: CrewMember[];
};

function ViewMoreCredits(prop: Prop) {
    const { director, cast, crew, contentDetails } = prop;
    const [showCreditsWindow, setShowCreditsWindow] = useState<boolean>(false);
    usePreventBodyScroll(showCreditsWindow);
    return (
        <div>
            <div
                aria-label="Pop up window displaying more detailed content credits."
                className={`fixed inset-0 z-10 flex flex-col items-center h-dvh w-dvw bg-neutral-900 text-neutral-400 text-sm md:text-base space-y-8 py-4 overflow-y-auto ${!showCreditsWindow && 'hidden'}`}
            >
                <div className="flex gap-1 w-full pr-3">
                    <h2
                        className={`flex-1 ml-5 font-bold text-white text-center text-xl text-ellipsis truncate overflow-hidden ${poppins.className}`}
                    >
                        {'title' in contentDetails ? contentDetails.title : contentDetails.name}
                    </h2>

                    <button className="rounded-full" onClick={() => setShowCreditsWindow(false)}>
                        <XMarkIcon className="size-6 rounded-full bg-neutral-700 text-white" />
                    </button>
                </div>
                <div className="flex flex-col items-center gap-8 overflow-y-auto no-scrollbar w-full">
                    <div className="space-y-3">
                        <h3 className="text-white text-xl font-bold text-center">Cast</h3>
                        <ul
                            aria-label="A list consisting of actors."
                            className="flex flex-col items-center gap-3"
                        >
                            {cast.map((member) => {
                                return (
                                    <li key={member.id}>
                                        <p className="">{member.name}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    {director && (
                        <>
                            {typeof director === 'string' ? (
                                <div className="space-y-3">
                                    <h3 className="text-white text-lg text-center font-bold">
                                        Director
                                    </h3>
                                    <p className="">{director}</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <h3 className="text-white text-lg font-bold text-center">
                                        {director.length > 1 ? 'Directors' : 'Director'}
                                    </h3>
                                    <ul
                                        aria-label="A list consisting of writers"
                                        className="flex flex-col items-center gap-3"
                                    >
                                        {director.map((name, index) => {
                                            return (
                                                <li key={index}>
                                                    <p className="">{name}</p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}

                    {crew.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="text-white text-lg font-bold text-center">Writers</h3>
                            <ul
                                aria-label="A list consisting of writers"
                                className="flex flex-col items-center gap-3"
                            >
                                {crew.map((member, index) => {
                                    if (member.job.toLowerCase() !== 'writer') return;
                                    return (
                                        <li key={member.id + index}>
                                            <p className="">{member.name}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                    <div className="space-y-3">
                        <h3 className="text-white text-lg font-bold text-center">Genre</h3>
                        <ul
                            aria-label="A list consisting of writers"
                            className="flex flex-col items-center gap-3"
                        >
                            {contentDetails.genres.map((genre) => {
                                return (
                                    <li key={genre.id}>
                                        <p className="">{genre.name}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <button
                className="font-bold text-neutral-400 lg:text-white"
                onClick={() => setShowCreditsWindow(true)}
            >
                more
            </button>
        </div>
    );
}

export default ViewMoreCredits;
