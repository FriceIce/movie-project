'use client';
import SearchNotFound from '@/components/SearchNotFound';
import { InputContext } from '@/context/SearchContext';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

type Props = {
    searchTerm: string;
};

function DesktopSearchContainer({ searchTerm }: Props) {
    const searchContext = useContext(InputContext);

    return !searchContext?.error ? (
        <div>
            <ul className="card-grid-auto-fill px-2 pb-2 no-scrollbar">
                {searchContext?.searchResults.map((content) => {
                    if (!content.poster_path || content.media_type === 'person') return;

                    // Shortcuts
                    const movieMediaType = content.media_type === 'movie';

                    return (
                        !content.adult && (
                            <li key={content.id} className={``}>
                                <Link
                                    href={`/content/${content.media_type}/${content.id}`}
                                    prefetch={false}
                                >
                                    <Image
                                        src={
                                            'https://image.tmdb.org/t/p/w500' + content.poster_path
                                        }
                                        alt={
                                            (movieMediaType ? content.title : content.name) +
                                            ' poster.'
                                        }
                                        height={172}
                                        width={750}
                                        className={`w-full h-full`}
                                    />
                                </Link>
                            </li>
                        )
                    );
                })}
            </ul>
        </div>
    ) : (
        <SearchNotFound searchTerm={searchTerm} />
    );
}

export default DesktopSearchContainer;
