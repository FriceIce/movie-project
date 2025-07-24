import Image from 'next/image';
import { topRankIcons } from '../svg';

type Prop = {
    title: string;
    content: Movie[];
};

function TopTenContentCarousel({ title, content }: Prop) {
    return (
        <div className="space-y-1">
            <h2 className="ml-3 font-bold text-base">{title}</h2>
            <ul className="flex gap-4 overflow-x-auto ml-3 no-scrollbar">
                {content.map((content, index, self) => {
                    const lastCard = index === self.length - 1;
                    if (!content.poster_path) return;

                    // Initialize the Rank component
                    const RankIcon = topRankIcons[index];
                    return (
                        <li
                            key={content.id}
                            className={`flex-none h-[170px] flex items-end rounded ${
                                lastCard && 'mr-2'
                            }`}
                        >
                            <RankIcon height="50%" color="#aaaaaa" />
                            <Image
                                src={content.poster_path}
                                alt={content.original_title + 'poster'}
                                width={500}
                                height={500}
                                className="rounded size-full shadow-blackShadow"
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TopTenContentCarousel;
