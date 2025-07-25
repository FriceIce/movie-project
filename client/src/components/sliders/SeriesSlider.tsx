import Image from 'next/image';

type Prop = {
    title: string;
    images: TvShow[];
};

function SeriesSlider({ title, images }: Prop) {
    return (
        <div className="space-y-1">
            <h2 className="ml-3 font-bold text-base md:text-lg 2xl:text-xl">{title}</h2>
            <ul className="flex gap-[4px] overflow-x-auto ml-3 no-scrollbar">
                {images.map((content, index, self) => {
                    const lastCard = index === self.length - 1;
                    if (!content.poster_path) return;
                    return (
                        <li
                            key={content.id}
                            className={`flex-none h-[170px] w-[115px md:h-[220px] md:w-[150px] lg:h-[280px] lg:w-[180px] 2xl:h-[340px] 2xl:w-[240px] rounded shadow-blackShadow ${
                                lastCard && 'mr-2'
                            }`}
                        >
                            <Image
                                src={content.poster_path}
                                alt={'poster'}
                                width={500}
                                height={500}
                                className="size-full rounded object-cover"
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default SeriesSlider;
