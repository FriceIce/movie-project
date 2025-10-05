'use client';

import { useSaveContent } from '@/context/SaveContentContext';
import useSetSavedContent from '@/hooks/useSetSavedContent';
import { deleteSavedContent, saveContent } from '@/utils/saveDeleteRetrieveContent';
import { CheckIcon, PlusIcon } from '@heroicons/react/20/solid';
import Cookies from 'js-cookie';
import { ReactNode } from 'react';
import { checkIfContentIsSaved } from '../../utils/CheckIfContentIsSaved';
import checkIfObjectIsEmpty from '@/utils/checkIfObjectIsEmpty';

type Props = {
    contentId: string;
    contentType: string;
    images: contentImages;
    savedContent: SavedContent[] | undefined;
    children: ReactNode;
};

function DesktopSaveContent(props: Props) {
    const { saveBtn, setSaveBtn } = useSaveContent();
    const token = Cookies.get('auth_token') as string;
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
                        ? saveContent(token, props, setSaveBtn)
                        : deleteSavedContent(token, props.contentId, setSaveBtn)
                }
            >
                {checkIfObjectIsEmpty(saveBtn) ? (
                    props.children
                ) : (
                    <>
                        <PlusIcon
                            className={`absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-white size-full lg:size-6 rounded-full ${checkIfContentIsSaved(props.savedContent, props.contentId, saveBtn) && 'transition-all duration-300 rotate-180 opacity-0'}`}
                        />
                        <CheckIcon
                            className={`absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-white size-full lg:size-6 rounded-full ${checkIfContentIsSaved(props.savedContent, props.contentId, saveBtn) ? 'transition-all duration-300 rotate-0 opacity-1 bg-custom-cyanBlue' : 'rotate-90 opacity-0'}`}
                        />
                    </>
                )}
            </button>
        </div>
    );
}

export default DesktopSaveContent;
