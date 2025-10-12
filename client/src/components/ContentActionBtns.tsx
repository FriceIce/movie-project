'use client';
import { ReactNode } from 'react';
import { checkIfContentIsSaved } from '@/features/content/utils/checkIfContentIsSaved';
import { deleteSavedContent, saveContent } from '@/utils/saveDeleteRetrieveContent';
import { BookmarkIcon, InformationCircleIcon } from '@heroicons/react/20/solid';
import { useSaveContent } from '@/context/SaveContentContext';
import checkIfObjectIsEmpty from '@/utils/checkIfObjectIsEmpty';
import useSetSavedContent from '@/hooks/useSetSavedContent';
import Cookies from 'js-cookie';
import Link from 'next/link';

type Prop = {
    id: number;
    type: 'tv' | 'movie';
    images: { posterPath: string; backdropPath: string };
    savedContent: SavedContent[] | undefined;
    children: ReactNode;
};

function ContentActionBtns({ id, type, savedContent, images, children }: Prop) {
    const { saveBtn, setSaveBtn } = useSaveContent();
    const accessToken = Cookies.get('auth_token') as string;
    useSetSavedContent({ setSaveBtn, contentId: String(id), savedContent, saveBtn });
    return (
        <>
            <Link href={`/content/${type}/` + id}>
                <button
                    type="button"
                    className="flex gap-2 items-center text-custom-black 2xl:text-lg px-6 py-2 lg:px-6 lg:py-[8px] 2xl:py-[11px] bg-white rounded-[2px] shadow-md"
                >
                    <InformationCircleIcon className={`size-5 md:size-6`} />
                    See Details
                </button>
            </Link>

            <button
                type="button"
                className="flex items-center gap-2 px-6 py-2 lg:px-6 lg:py-[8px] 2xl:py-[11px] rounded-[2px] bg-custom-cyanBlue 2xl:text-lg shadow-md"
                onClick={() =>
                    !saveBtn[id]
                        ? saveContent(
                              accessToken,
                              {
                                  images,
                                  contentId: String(id),
                                  contentType: type,
                              },
                              setSaveBtn
                          )
                        : deleteSavedContent(accessToken, String(id), setSaveBtn)
                }
            >
                {checkIfObjectIsEmpty(saveBtn) ? (
                    children
                ) : (
                    <>
                        {checkIfContentIsSaved(savedContent, String(id), saveBtn) && (
                            <BookmarkIcon className="size-5 md:size-6" />
                        )}
                        {!checkIfContentIsSaved(savedContent, String(id), saveBtn)
                            ? 'Add To List'
                            : 'Added'}
                    </>
                )}
            </button>
        </>
    );
}

export default ContentActionBtns;
