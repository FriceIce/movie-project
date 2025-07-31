'use client';
import { useState } from 'react';
// import { collection } from '@/assets/mockData/collection';
// import { similarMovies } from '@/assets/mockData/recommendations';
import MediaListTab from '../components/MediaListTab';

type Prop = {
    label?: string;
    collection: Collection | null;
    recommendations: Movie[];
};

function RelatedMediaSection({ label, collection, recommendations }: Prop) {
    const [option, setOption] = useState<0 | 1>(0); // Represents the percentage value for the animated div element position.

    return (
        <div aria-label={label} className="space-y-3">
            <div>
                <ul className="flex justify-start font-bold text-sm mt-0">
                    <li
                        className={`text-center flex-1 ${!recommendations.length && ' hidden'} ${!collection && 'text-start'}`}
                    >
                        <button
                            className={`${option === 0 && 'text-custom-cyanBlue'}`}
                            onClick={() => setOption(0)}
                        >
                            More Like This
                        </button>
                    </li>

                    {collection && (
                        <li
                            className={`text-center flex-1 ${!recommendations.length && ' text-start'}`}
                        >
                            <button
                                disabled={!collection.parts.length}
                                className={`${option === 1 && 'text-custom-cyanBlue'}`}
                                onClick={() => setOption(1)}
                            >
                                Collection
                            </button>
                        </li>
                    )}
                </ul>
            </div>

            {option === 0 && recommendations.length > 0 && (
                <MediaListTab label={'Recommendations'} media={recommendations} />
            )}
            {option === 1 && collection && (
                <MediaListTab label={'Collections'} media={collection.parts} />
            )}
        </div>
    );
}

export default RelatedMediaSection;
