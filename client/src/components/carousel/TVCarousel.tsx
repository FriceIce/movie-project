import Image from 'next/image';

type Prop = {
    title: string;
    images: TvShow[];
};

function TvCarousel({ title, images }: Prop) {
    return (
        <div className="space-y-1">
            <h2 className="ml-3 font-bold text-base">{title}</h2>
            <ul className="flex gap-[4px] overflow-x-auto ml-3 no-scrollbar">
                {images.map((content, index, self) => {
                    const lastCard = index === self.length - 1;
                    if (!content.poster_path) return;
                    return (
                        <li
                            key={content.id}
                            className={`flex-none h-[170px] w-[115px] rounded shadow-blackShadow ${
                                lastCard && 'mr-2'
                            }`}
                        >
                            <Image
                                src={content.poster_path}
                                alt={'poster'}
                                width={500}
                                height={500}
                                loading="lazy"
                                className="size-full rounded"
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TvCarousel;
