import { BookmarkIcon, CheckIcon, PlusIcon } from '@heroicons/react/24/outline';
import { checkIfContentIsSaved } from '../../utils/checkIfContentIsSaved';

type Props = {
    screen: 'mobile' | 'desktop' | 'heroImg';
    savedContent: SavedContent[] | undefined;
    contentId: string;
};

function SaveContentIcons({ savedContent, contentId, screen }: Props) {
    return (
        <div>
            {screen === 'mobile' && (
                <div className="relative size-5">
                    <PlusIcon
                        className={`absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] size-5 text-black ${checkIfContentIsSaved(savedContent, contentId) && 'opacity-0'}`}
                    />
                    <BookmarkIcon
                        className={`absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] size-5 text-white ${checkIfContentIsSaved(savedContent, contentId) ? ' opacity-1' : 'opacity-0'}`}
                    />
                </div>
            )}

            {screen === 'desktop' && (
                <>
                    <PlusIcon
                        className={`absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-white size-full lg:size-6 rounded-full ${checkIfContentIsSaved(savedContent, contentId) && 'transition-all duration-300 rotate-180 opacity-0'}`}
                    />
                    <CheckIcon
                        className={`absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-white size-full lg:size-6 rounded-full ${checkIfContentIsSaved(savedContent, contentId) ? 'transition-all duration-300 rotate-0 opacity-1 bg-custom-cyanBlue' : 'rotate-90 opacity-0'}`}
                    />
                </>
            )}

            {screen === 'heroImg' && (
                <div className="flex items-center gap-2">
                    {checkIfContentIsSaved(savedContent, contentId) && (
                        <BookmarkIcon className="size-5 md:size-6" />
                    )}
                    {!checkIfContentIsSaved(savedContent, contentId) ? 'Add To List' : 'Added'}
                </div>
            )}
        </div>
    );
}

export default SaveContentIcons;
