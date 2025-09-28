import { checkIfContentIsSaved } from '@/features/content/utils/CheckIfContentIsSaved';
import { Dispatch, SetStateAction, useEffect } from 'react';

type Props = {
    setSaveBtn: Dispatch<SetStateAction<Record<string, string | boolean>>>;
    savedContent: SavedContent[] | undefined;
    contentId: string;
};

function useSetSavedContent({ setSaveBtn, ...props }: Props) {
    useEffect(() => {
        const isSaved = checkIfContentIsSaved(props.savedContent, props.contentId);
        setSaveBtn((prev) => ({
            ...prev,
            [props.contentId]: isSaved,
        }));
    }, [props.contentId, props.savedContent, setSaveBtn]);
}

export default useSetSavedContent;
