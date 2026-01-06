'use client';
import { ReactNode } from 'react';
import { deleteSavedContent, saveContent } from '@/utils/saveDeleteRetrieveContent';
import { BookmarkIcon, InformationCircleIcon } from '@heroicons/react/20/solid';
import { useSaveContent } from '@/context/SaveContentContext';
import checkIfObjectIsEmpty from '@/utils/checkIfObjectIsEmpty';
import useSetSavedContent from '@/hooks/useSetSavedContent';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { checkIfContentIsSaved } from '@/features/content/utils/CheckIfContentIsSaved';

type Prop = {
    id: number;
    type: 'tv' | 'movie';
    title: string;
    images: { posterPath: string; backdropPath: string };
    savedContent: SavedContent[] | undefined;
    children: ReactNode;
};

function ContentActionBtns({ id, type, title, savedContent, images, children }: Prop) {
    const { saveBtn, setSaveBtn, setSavedTitles } = useSaveContent();
    const accessToken = Cookies.get('auth_token') as string;
    useSetSavedContent({ setSaveBtn, contentId: String(id), savedContent, saveBtn });
    return (
        <>
            <Link href={`/content/${type}/` + id} prefetch={false}>
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
                                  title,
                                  images,
                                  contentId: String(id),
                                  contentType: type,
                              },
                              setSaveBtn,
                              setSavedTitles
                          )
                        : deleteSavedContent(accessToken, String(id), setSaveBtn, setSavedTitles)
                }
            >
                {checkIfObjectIsEmpty(saveBtn) ? (
                    children
                ) : (
                    <>
                        {(saveBtn[id] ??
                            checkIfContentIsSaved(savedContent, String(id), saveBtn)) && (
                            <BookmarkIcon className="size-5 md:size-6" />
                        )}
                        {!saveBtn[id] || !checkIfContentIsSaved(savedContent, String(id), saveBtn)
                            ? 'Add To List'
                            : 'Added'}
                    </>
                )}
            </button>
        </>
    );
}

export default ContentActionBtns;
