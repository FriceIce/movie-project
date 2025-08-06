import { useEffect } from 'react';

function usePreventBodyScroll(windowIsOpen: boolean) {
    useEffect(() => {
        const body = document.body as HTMLBodyElement;
        const originalScrollStyle = body.style.overflowY;

        if (!windowIsOpen) {
            body.style.overflowY = 'auto';
        } else {
            body.style.overflowY = 'hidden';
        }

        return () => {
            body.style.overflowY = originalScrollStyle;
        };
    }, [windowIsOpen]);
}

export default usePreventBodyScroll;
