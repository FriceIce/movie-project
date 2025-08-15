'use client';
import { trendingObj } from '@/assets/data/all/trending';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { InputContext } from '../SearchContext';
import { useContext } from 'react';

function ContentList() {
    const trending = trendingObj.results as MediaItem[];
    const context = useContext(InputContext);
    return (
        <>
            {!context?.input ? (
                <ul className="flex-1 space-y-2 h-full px-3 no-scrollbar">
                    {trending.map((content, index) => {
                        if (content.media_type === 'person') return;
                        if (!content.backdrop_path) return null;

                        // Shortcuts
                        const contentType = content.media_type;
                        const lastIndex = index === trending.length - 1;

                        return (
                            <li key={content.id}>
                                <Link
                                    href={`/content/${content.media_type}/${content.id}`}
                                    className={`flex items-center gap-3 rounded ${lastIndex && 'pb-3'}`}
                                >
                                    <div>
                                        <Image
                                            src={
                                                'https://image.tmdb.org/t/p/w300' +
                                                content.backdrop_path
                                            }
                                            alt={`${contentType === 'movie' ? content.title : content.name} image.`}
                                            height={85}
                                            width={150}
                                            className="blackShadow h-[85px] w-[150px]"
                                        />
                                    </div>
                                    <div className="flex gap-1 flex-1">
                                        <h2 className="flex-1 text-sm font-semibold line-clamp-2">
                                            {contentType === 'movie' ? content.title : content.name}
                                        </h2>
                                        <InformationCircleIcon className="size-5" />
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <ul className="card-grid-auto-fill px-2 pb-2 no-scrollbar">
                    {trending.map((content) => {
                        if (!content.poster_path || content.media_type === 'person') return;

                        // Shortcuts
                        const movieMediaType = content.media_type === 'movie';
                        const title = content.media_type === 'movie' ? content.title : content.name;

                        return (
                            title.toLowerCase().includes(`${context.input?.toLowerCase()}`) && (
                                <li key={content.id} className={``}>
                                    <Link href={`/content/${content.media_type}/${content.id}`}>
                                        <Image
                                            src={
                                                'https://image.tmdb.org/t/p/w300' +
                                                content.poster_path
                                            }
                                            alt={
                                                (movieMediaType ? content.title : content.name) +
                                                ' poster.'
                                            }
                                            height={172}
                                            width={115}
                                            className={`w-full h-full`}
                                        />
                                    </Link>
                                </li>
                            )
                        );
                    })}
                </ul>
            )}
        </>
    );
}

export default ContentList;
