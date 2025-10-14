import Image from 'next/image';

type Props = {
    savedTitles?: SavedContent[] | undefined;
};

function UserSavedTitles({ savedTitles }: Props) {
    const arr = Array.from({ length: 5 });
    return (
        <section className="space-y-2 mt-8 px-2">
            <h1 className="font-semibold text-2xl">My List</h1>
            <ul className="card-grid" style={{ gap: '8px' }}>
                {arr.map((content, i) => {
                    return (
                        <li key={i} className="border h-[170px]">
                            {/* <Image
                                src={`https://image.tmdb.org/t/p/w500/${content.poster_posterPath}`}
                                alt={content.content_type + ' content.'}
                                width={500}
                                height={750}
                                className="border w-[115px] h-[170px]"
                            /> */}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

export default UserSavedTitles;
