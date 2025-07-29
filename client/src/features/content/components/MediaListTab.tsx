import Image from 'next/image';

type Prop = {
    label: string;
    media: Movie[] | TvShow[];
};

function MediaListTab({ label, media }: Prop) {
    return (
        <ul aria-label={label} className="card-grid">
            {media.map((content) => {
                if (!content.poster_path) return;
                const title = 'title' in content ? content.title : content.original_name;

                return (
                    <li key={content.id} className="" role="button" tabIndex={0}>
                        <Image
                            src={'https://image.tmdb.org/t/p/w342' + content.poster_path}
                            alt={title + 'poster'}
                            width={500}
                            height={230}
                            className="object-contain"
                        />
                    </li>
                );
            })}
        </ul>
    );
}

export default MediaListTab;
