import { useCallback, useRef, useEffect } from 'react';
import { SearchContextType } from '@/context/SearchContext';
import { debounce } from '@/utils/debounce';

function useDebounce(inputContext: SearchContextType) {
    const contextRef = useRef(inputContext);

    // This useEffect is a workaround to prevent build-time errors
    useEffect(() => {
        contextRef.current = inputContext;
    }, [inputContext]);

    const handleSearch = useCallback(
        debounce((searchTerm: string) => {
            contextRef.current?.setInput(searchTerm);
        }, 300),
        []
    );

    return handleSearch;
}

export default useDebounce;
