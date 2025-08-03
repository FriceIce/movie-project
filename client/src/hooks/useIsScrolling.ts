import { useEffect, useState } from 'react';

const useIsScrolling = () => {
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        function checkIfScrolling() {
            const currentScrollY = window.scrollY;

            if (!scrolling && currentScrollY >= 10) setScrolling(true);
            if (currentScrollY < 10) setScrolling(false);
        }

        window.addEventListener('scroll', checkIfScrolling);

        return () => window.removeEventListener('scroll', checkIfScrolling);
    }, [scrolling]);

    return scrolling;
};

export default useIsScrolling;
