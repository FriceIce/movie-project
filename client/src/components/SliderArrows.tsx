'use client';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { RefObject } from 'react';

type Prop = {
    sliderRef: RefObject<HTMLUListElement> | null;
    scrollAmount: number;
    children: React.ReactNode;
    displayArrow: DisplayArrow;
};

function SliderArrows(prop: Prop) {
    const { sliderRef, scrollAmount, children, displayArrow } = prop;

    function scroll(scroll: 'right' | 'left') {
        const sliderElement = sliderRef?.current;

        if (scroll === 'right') {
            sliderElement?.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }

        if (scroll === 'left') {
            sliderElement?.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth',
            });
        }
    }

    return (
        <>
            <div
                className={`absolute bottom-0 left-0 hidden md:block bg-[#00000000] hover:bg-[#0000009f] h-full ${displayArrow && !displayArrow.left && 'md:hidden'}`}
            >
                <button
                    className="h-full"
                    onClick={() => {
                        scroll('left');
                    }}
                >
                    <ChevronLeftIcon className="text-white size-16" />
                </button>
            </div>

            {children}

            <div
                className={`absolute bottom-0 right-0 hidden md:block bg-[#00000000] hover:bg-[#0000009f] h-full  ${displayArrow && !displayArrow.right && 'md:hidden'}`}
                onClick={() => scroll('right')}
            >
                <button className="h-full">
                    <ChevronRightIcon className="text-white size-14" />
                </button>
            </div>
        </>
    );
}

export default SliderArrows;
