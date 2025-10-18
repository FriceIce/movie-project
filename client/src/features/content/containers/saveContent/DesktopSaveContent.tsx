'use client';

import { useSaveContent } from '@/context/SaveContentContext';
import useSetSavedContent from '@/hooks/useSetSavedContent';
import checkIfObjectIsEmpty from '@/utils/checkIfObjectIsEmpty';
import { deleteSavedContent, saveContent } from '@/utils/saveDeleteRetrieveContent';
import { CheckIcon, PlusIcon } from '@heroicons/react/20/solid';
import Cookies from 'js-cookie';
import { ReactNode } from 'react';
import { checkIfContentIsSaved } from '../../utils/CheckIfContentIsSaved';

type Props = {
    title: string;
    contentId: string;
    contentType: 'movie' | 'tv';
    images: contentImages;
    savedContent: SavedContent[] | undefined;
    children: ReactNode;
};

function DesktopSaveContent(props: Props) {
    const { saveBtn, setSaveBtn, setSavedTitles } = useSaveContent();
    const token = Cookies.get('auth_token') as string;

    const getSavedState = () => {
        return (
            saveBtn[props.contentId] ??
            checkIfContentIsSaved(props.savedContent, props.contentId, saveBtn)
        );
    };

    useSetSavedContent({
        saveBtn,
        setSaveBtn,
        contentId: props.contentId,
        savedContent: props.savedContent,
    });

    return (
        <div>
            <button
                title={
                    !saveBtn[props.contentId]
                        ? `Add the content to your list.`
                        : `Content is saved to your list.`
                }
                className="relative hidden md:flex size-6 lg:size-8 border rounded-full justify-center items-center ml-6"
                onClick={() =>
                    !saveBtn[props.contentId]
                        ? saveContent(token, props, setSaveBtn, setSavedTitles)
                        : deleteSavedContent(token, props.contentId, setSaveBtn, setSavedTitles)
                }
            >
                {checkIfObjectIsEmpty(saveBtn) ? (
                    props.children
                ) : (
                    <>
                        <PlusIcon
                            className={`absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-white size-full lg:size-6 rounded-full ${getSavedState() && 'transition-all duration-300 rotate-180 opacity-0'}`}
                        />
                        <CheckIcon
                            className={`absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-white size-full lg:size-6 rounded-full ${getSavedState() ? 'transition-all duration-300 rotate-0 opacity-1 bg-custom-cyanBlue' : 'rotate-90 opacity-0'}`}
                        />
                    </>
                )}
            </button>
        </div>
    );
}

export default DesktopSaveContent;
