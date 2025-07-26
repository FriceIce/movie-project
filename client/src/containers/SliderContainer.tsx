'use client';
import SliderArrows from '@/components/SliderArrows';
import { topRankIcons } from '@/components/svg';
import useScrollAmount from '@/hooks/useScrollAmount';
import Image from 'next/image';
import { useRef, useState } from 'react';

type Prop = {
    images: Movie[] | TvShow[];
    rank?: boolean;
};

function SliderContainer({ images, rank }: Prop) {
    const sliderRef = useRef<HTMLUListElement | null>(null);
    const posterRef = useRef<HTMLLIElement | null>(null);
    const posterRankRef = useRef<HTMLLIElement | null>(null);
    const [displayArrow, setDisplayArrow] = useState<DisplayArrow>({ left: false, right: true });
    const scrollAmount = useScrollAmount(posterRef);
    const rankScrollAmount = useScrollAmount(posterRankRef, true);

    function handleArrows() {
        if (!displayArrow) return;

        const sliderElement = sliderRef?.current;
        const sliderPosition = sliderElement?.scrollLeft ?? 0;
        const sliderWidth = sliderElement?.offsetWidth ?? 0;
        const sliderScrollWidth = sliderElement?.scrollWidth ?? 0;

        // If the scroll is at the end, the arrow will be hidden
        if (sliderPosition + sliderWidth >= sliderScrollWidth) {
            setDisplayArrow((prev) => ({
                left: prev.left,
                right: !prev.right,
            }));
        }

        // If the scroll position is greater than 0 and the left arrow is hidden, it will be shown.
        if (sliderPosition >= 0 && !displayArrow.left) {
            console.log('human');
            setDisplayArrow((prev) => ({
                left: true,
                right: prev.right,
            }));
        }

        // The arrow will be hidden when the scroll position is at the top (0 or less).
        if (sliderPosition <= 0) {
            setDisplayArrow((prev) => ({
                left: !prev.left,
                right: prev.right,
            }));
        }

        // If the scroll position at the end and the right arrow is hidden, it will be shown.
        if (sliderPosition + sliderWidth <= sliderScrollWidth && !displayArrow.right) {
            setDisplayArrow((prev) => ({
                left: prev.left,
                right: true,
            }));
        }
    }

    return (
        <div className={`relative`}>
            <SliderArrows
                sliderRef={sliderRef}
                scrollAmount={rank ? rankScrollAmount : scrollAmount}
                displayArrow={displayArrow}
            >
                <ul
                    onScroll={() => handleArrows()}
                    ref={sliderRef}
                    className={`flex overflow-x-auto no-scrollbar ${rank ? 'gap-[20px]' : 'gap-[4px]'}`}
                >
                    {images.map((content, index, self) => {
                        const lastCard = index === self.length - 1;
                        const firstCard = index === 0;

                        // Skip if there is no images
                        if (!content.poster_path || !content.backdrop_path) return null;

                        const title =
                            'original_title' in content
                                ? content.original_title
                                : content.original_name;

                        const RankIcon = topRankIcons[index];

                        // Return correct LI element based on rank prop value
                        if (!rank) {
                            return (
                                <li
                                    key={content.id}
                                    ref={posterRef}
                                    className={`flex-none h-[170px] w-[115px] md:h-[220px] md:w-[150px] lg:h-[280px] lg:w-[180px] rounded shadow-blackShadow ${firstCard ? 'ml-2' : ''} ${lastCard ? 'mr-2' : ''}`}
                                >
                                    <Image
                                        src={content.poster_path}
                                        alt={title + ' poster'}
                                        width={500}
                                        height={500}
                                        className="size-full rounded object-cover"
                                    />
                                </li>
                            );
                        } else {
                            return (
                                <li
                                    key={content.id + '-rank'}
                                    ref={posterRankRef}
                                    className={`flex-none h-[170px] md:h-[220px] lg:h-[280px] flex items-end rounded ${lastCard ? 'mr-2' : ''}`}
                                >
                                    <RankIcon height="50%" color="#aaaaaa" />
                                    <Image
                                        src={content.poster_path}
                                        alt={title + ' poster'}
                                        width={500}
                                        height={500}
                                        className="rounded size-full shadow-blackShadow"
                                    />
                                </li>
                            );
                        }
                    })}
                </ul>
            </SliderArrows>
        </div>
    );
}

export default SliderContainer;
