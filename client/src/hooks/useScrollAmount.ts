import { MutableRefObject, useEffect, useState } from 'react';

/**
 * Calculates the horizontal scroll distance needed to reveal the next unseen list item (<li>)
 * within a scrollable list (<ul>).
 *
 * The calculation is based on the width of the referenced list item and the current screen size.
 *
 * If `rank` is true, a larger gap (`GAP = 20`) is used between elements; otherwise, the default gap is 4.
 *
 * @param {MutableRefObject<HTMLLIElement | null>} posterRef
 * @param {boolean} [rank]
 * @returns {number} The amount of pixels to scroll in order to advance to the next slide.
 */

function useScrollAmount(posterRef: MutableRefObject<HTMLLIElement | null>, rank?: boolean) {
    const [scrollAmount, setScrollAmount] = useState<number>(0);

    useEffect(() => {
        const GAP = rank ? 20 : 4;
        const posterElement = posterRef.current;
        const POSTER_WIDTH = posterElement ? posterElement.clientWidth : 0;

        const updateVisiblePosters = () => {
            const screenWidth = window.innerWidth;
            const count = Math.floor((screenWidth + GAP) / (POSTER_WIDTH + GAP));

            const totalScroll = count * POSTER_WIDTH + (count - 1) * 2;
            setScrollAmount(totalScroll);
        };

        updateVisiblePosters();
        window.addEventListener('resize', updateVisiblePosters);
        return () => window.removeEventListener('resize', updateVisiblePosters);
    }, [posterRef, posterRef.current?.clientWidth, rank]);

    return scrollAmount;
}

export default useScrollAmount;
