'use client';

import { icons } from '@/assets/icons';
import Image from 'next/image';

type Props = {
    info: Pick<User, 'email' | 'username'>;
};

function UserInfo({ info }: Props) {
    return (
        <div className="flex flex-col items-center gap-2 border px-2">
            <Image
                src={icons.avatar.src}
                alt={icons.avatar.alt}
                width={icons.avatar.width}
                height={icons.avatar.height}
                className={`size-14 md:size-10 rounded-[2px]`}
            />

            <div className="text-sm text-center">
                <p className="">{info.username}</p>
                <p className="">{info.email}</p>
            </div>
        </div>
    );
}

export default UserInfo;
