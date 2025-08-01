'use client';
import { useState } from 'react';
import MediaListTab from '../components/MediaListTab';

type Prop = {
    label?: string;
    collection: Collection | null;
    recommendations: Movie[];
};

function RelatedMediaSection({ label, collection, recommendations }: Prop) {
    const [option, setOption] = useState<0 | 1>(0); // Represents the percentage value for the animated div element position.

    return (
        <div aria-label={label} className="space-y-3 lg:space-y-5 sm:mt-10 md:mt-14">
            <div>
                <ul className="flex font-bold mt-0 text-sm sm:text-base md:text-xl lg:text-[22px] lg:flex-col-reverse lg:gap-10">
                    <li
                        className={`text-center lg:text-start flex-1 lg:space-y-4 ${!recommendations.length && ' hidden'} ${!collection && 'text-start'}`}
                    >
                        <button
                            className={`${option === 0 && 'text-custom-cyanBlue lg:text-white'}`}
                            onClick={() => setOption(0)}
                        >
                            More Like This
                        </button>

                        <div className="hidden lg:block">
                            <MediaListTab label={'Recommendations'} media={recommendations} />
                        </div>
                    </li>

                    {collection && (
                        <li
                            className={`text-center lg:text-start flex-1 lg:space-y-4 ${!recommendations.length && ' text-start'}`}
                        >
                            <button
                                disabled={!collection.parts.length}
                                className={`${option === 1 && 'text-custom-cyanBlue lg:text-white'}`}
                                onClick={() => setOption(1)}
                            >
                                <span className="hidden md:block">{collection.name}</span>
                                <span className="md:hidden">Collection</span>
                            </button>

                            <div className="hidden lg:block">
                                <MediaListTab label={'Collections'} media={collection.parts} />
                            </div>
                        </li>
                    )}
                </ul>
            </div>

            <div className="lg:hidden">
                {option === 0 && recommendations.length > 0 && (
                    <MediaListTab label={'Recommendations'} media={recommendations} />
                )}
                {option === 1 && collection && (
                    <MediaListTab label={'Collections'} media={collection.parts} />
                )}
            </div>
        </div>
    );
}

export default RelatedMediaSection;
