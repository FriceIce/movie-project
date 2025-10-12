'use client';
import { useSaveContent } from '@/context/SaveContentContext';
import useSetSavedContent from '@/hooks/useSetSavedContent';
import checkIfObjectIsEmpty from '@/utils/checkIfObjectIsEmpty';
import { deleteSavedContent, saveContent } from '@/utils/saveDeleteRetrieveContent';
import { BookmarkIcon, PlusIcon } from '@heroicons/react/20/solid';
import Cookies from 'js-cookie';
import { ReactNode } from 'react';
import { checkIfContentIsSaved } from '../../utils/checkIfContentIsSaved';

type Props = {
    contentId: string;
    contentType: string;
    images: contentImages;
    savedContent: SavedContent[] | undefined;
    children: ReactNode;
};

function MobileSaveContent(props: Props) {
    const { saveBtn, setSaveBtn } = useSaveContent();
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
                className={`md:hidden flex gap-1 items-center justify-center text-sm lg:text-base font-semibold rounded-[2px] w-full h-[42px] px-4 ${getSavedState() ? 'bg-custom-cyanBlue text-white' : 'bg-white text-black'}`}
                onClick={() =>
                    !saveBtn[props.contentId]
                        ? saveContent(token, props, setSaveBtn)
                        : deleteSavedContent(token, props.contentId, setSaveBtn)
                }
            >
                {checkIfObjectIsEmpty(saveBtn) ? (
                    props.children
                ) : (
                    <div className="relative size-5">
                        <PlusIcon
                            className={`absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] size-5 text-black ${getSavedState() ? 'opacity-0' : 'opacity-1'}`}
                        />
                        <BookmarkIcon
                            className={`absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] size-5 text-white ${getSavedState() ? 'opacity-1' : 'opacity-0'}`}
                        />
                    </div>
                )}
                <p className="">{getSavedState() ? 'Saved' : 'My List'}</p>
            </button>
        </div>
    );
}

export default MobileSaveContent;
