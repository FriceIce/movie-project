import { icons } from '@/assets/icons';
import { AuthContextType } from '@/context/AuthContext';
import Image from 'next/image';
import SignOutContainer from './SignOutContainer';
import { useState } from 'react';

type Props = {
    userContext: AuthContextType | null;
};

function ProfileContainer({ userContext }: Props) {
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
                className={`size-10 rounded-[2px]`}
            ></Image>
            <p className={`hidden md:block text-xs h-4`}>{userContext?.user?.username}</p>
            <SignOutContainer displaySignoutOption={displaySignoutOption} />
        </div>
    );
}

export default ProfileContainer;
