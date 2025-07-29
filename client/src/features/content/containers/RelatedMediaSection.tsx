'use client';
import { useState } from 'react';
import { collection } from '@/assets/mockData/collection';
import { similarMovies } from '@/assets/mockData/recommendations';
import MediaListTab from '../components/MediaListTab';

type Prop = {
    label?: string;
};

function RelatedMediaSection({ label }: Prop) {
    const [option, setOption] = useState<0 | 1>(0); // Represents the percentage value for the animated div element position.

    return (
        <div aria-label={label} className="space-y-3">
            <div>
                <ul className="flex justify-start font-bold text-sm mt-0">
                    <li
                        className={`text-center flex-1 ${!similarMovies.length && ' hidden'} ${!collection.parts.length && 'text-start'}`}
                    >
                        <button
                            className={`${option === 0 && 'text-custom-cyanBlue'}`}
                            onClick={() => setOption(0)}
                        >
                            More Like This
                        </button>
                    </li>
                    <li
                        className={`text-center flex-1 ${!collection.parts.length && 'hidden'} ${!similarMovies.length && ' text-start'}`}
                    >
                        <button
                            disabled={!collection.parts.length}
                            className={`${option === 1 && 'text-custom-cyanBlue'}`}
                            onClick={() => setOption(1)}
                        >
                            Collection
                        </button>
                    </li>
                </ul>
            </div>

            {option === 0 && similarMovies.length > 0 && (
                <MediaListTab label={'Recommendations'} media={similarMovies} />
            )}
            {option === 1 && collection.parts.length > 0 && (
                <MediaListTab label={'Collections'} media={collection.parts} />
            )}
        </div>
    );
}

export default RelatedMediaSection;
