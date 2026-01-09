import Image from 'next/image';
import Link from 'next/link';

type Prop = {
    label: string;
    media: Movie[] | TvShow[];
};

function MediaListTab({ label, media }: Prop) {
    return (
        <ul aria-label={label} className="card-grid">
            {media.map((content) => {
                if (!content.poster_path) return;

                // If title exists in the content object, it's a movie, otherwise, it's a tv show.
                const condition = 'title' in content;
                const contentType = condition ? 'movie' : 'tv';
                const title = condition ? content.title : content.name;

                return (
                    <li key={content.id} className="" role="button" tabIndex={0}>
                        <Link href={`/content/${contentType}/${content.id}`} prefetch={false}>
                            <div className="relative size-full">
                                <div className="absolute inset-0 size-full md:hover:bg-[#0000002f]"></div>
                                <Image
                                    src={'https://image.tmdb.org/t/p/w342' + content.poster_path}
                                    alt={title + 'poster'}
                                    width={500}
                                    height={230}
                                    className="object-contain rounded-[2px]"
                                />
                            </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

export default MediaListTab;
