import { SearchContextType } from '@/context/SearchContext';
import { debounce } from '@/utils/debounce';
import { useCallback } from 'react';
import { fetchSearch } from './fetchSearch';

function useDebounce(searchContext: SearchContextType) {
    const handleSearch = useCallback(
        debounce(async (searchTerm: string) => {
            const token = process.env.NEXT_PUBLIC_SERVER_TOKEN as string;

            if (searchTerm) {
                // Returns an object or error code
                const searchResponse = await fetchSearch<FetchResponse<MovieItem<MediaItem[]>>>(
                    token,
                    searchTerm
                );

                if (typeof searchResponse === 'number') {
                    searchContext?.setError(searchResponse);
                }

                if (typeof searchResponse === 'object') {
                    const checkingForPersonItem = searchResponse.data.results
                        .map((content) => {
                            // Checks if the item is a person item and ensures the search term matches their name.
                            if (
                                'known_for' in content &&
                                searchTerm.toLowerCase() === content.name.toLowerCase()
                            )
                                return content.known_for;

                            // If it's not a person item the map will return the object as it is.
                            return content;
                        })
                        .flat();

                    // console.log({ checkingForPersonItem });

                    // Updates the search results and sets Error to null
                    searchContext.setSearchResults(checkingForPersonItem);
                    searchContext.setError(null);
                }
            }

            searchContext.setInput(searchTerm);
        }, 300),
        []
    );

    return handleSearch;
}

export default useDebounce;
