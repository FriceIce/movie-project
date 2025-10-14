import { icons } from '@/assets/icons';
import Image from 'next/image';
import { useState } from 'react';
import SignOutContainer from './SignOutContainer';

type Props = {
    username?: string | undefined;
};

function ProfileContainer({ username }: Props) {
    const [displaySignoutOption, setDisplaySignoutOption] = useState<boolean>(false);
    return (
        <div
            className="relative flex flex-col items-center gap-1"
            role="button"
            onClick={() => setDisplaySignoutOption((prev) => !prev)}
        >
            <Image
                src={icons.avatar.src}
                alt={icons.avatar.alt}
                width={icons.avatar.width}
                height={icons.avatar.height}
                className={`size-8 md:size-10 rounded-[2px]`}
            />
            <p className={`hidden md:block text-xs h-4`}>{username || 'User'}</p>
            <SignOutContainer displaySignoutOption={displaySignoutOption} />
        </div>
    );
}

export default ProfileContainer;
