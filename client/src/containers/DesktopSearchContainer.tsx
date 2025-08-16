import { trendingObj } from '@/assets/data/all/trending';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    searchTerm: string;
};

function DesktopSearchContainer({ searchTerm }: Props) {
    const trending = trendingObj.results as MediaItem[];
    return (
        <div>
            <ul className="card-grid-auto-fill px-2 pb-2 no-scrollbar">
                {trending.map((content) => {
                    if (!content.poster_path || content.media_type === 'person') return;

                    // Shortcuts
                    const movieMediaType = content.media_type === 'movie';
                    const title = content.media_type === 'movie' ? content.title : content.name;

                    return (
                        title.toLowerCase().includes(`${searchTerm?.toLowerCase()}`) && (
                            <li key={content.id} className={``}>
                                <Link href={`/content/${content.media_type}/${content.id}`}>
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
    );
}

export default DesktopSearchContainer;
