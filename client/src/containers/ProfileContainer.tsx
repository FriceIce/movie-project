'use client';
import { icons } from '@/assets/icons';
import { Auth } from '@/context/AuthContext';
import Image from 'next/image';
import { useContext } from 'react';

type Props = {
    username?: string | undefined;
};

function ProfileContainer({ username }: Props) {
    const auth = useContext(Auth);

    return (
        <div
            className="relative flex flex-col items-center gap-1"
            role="button"
            onClick={() => (window.location.href = '/profile')}
        >
            <Image
                src={icons.avatar.src}
                alt={icons.avatar.alt}
                width={icons.avatar.width}
                height={icons.avatar.height}
                className={`size-8 md:size-10 rounded-[2px]`}
            />
            <p className={`hidden md:block h-4`}>{username || auth?.user?.username || 'User'}</p>
        </div>
    );
}

export default ProfileContainer;
