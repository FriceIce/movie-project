'use client';
import { useEffect, useState } from 'react';

type ScreenWidth = 1536 | 1280 | 1024 | 768 | 640;

/**
 * A custom hook that returns a boolean indicating whether the current screen width
 * is greater than or equal to the specified `mediaWidth` breakpoint.
 *
 * This hook listens for changes in the screen width and updates accordingly.
 *
 * @param {ScreenWidth} mediaWidth The minimum screen width to compare against.
 * @returns {boolean} Returns `true` if the current screen width is greater than or equal
 *                    to the specified `mediaWidth`, and `false` otherwise.
 */

export const useMediaQuery = (mediaWidth: ScreenWidth) => {
    const [matches, setMatches] = useState<boolean | null>(null);

    useEffect(() => {
        const matchMedia: MediaQueryList = window.matchMedia(`(min-width: ${mediaWidth}px)`);

        // Function to update matches based on matchMedia
        const handleChange = () => {
            setMatches(matchMedia.matches);
        };

        // Call handleChange once to initialize the correct value
        handleChange();

        // Add event listener
        matchMedia.addEventListener('change', handleChange);

        // Remove event listener when the component unmounts
        return () => {
            matchMedia.removeEventListener('change', handleChange);
        };
    }, [setMatches]);

    return matches;
};
