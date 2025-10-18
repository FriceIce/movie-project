'use client';

import { icons } from '@/assets/icons';
import Image from 'next/image';

type Props = {
    email: string | undefined;
    username: string | undefined;
};

function UserInfo({ username, email }: Props) {
    const upperCase = (text: string) => {
        return text?.split('')[0].toUpperCase() + text?.substring(1);
    };
    const modifiedUsername = username && upperCase(username);
    const modifiedEmail = email && upperCase(email);
    return (
        <div className="flex flex-col items-center md:flex-row md:px-10 gap-2 md:gap-6 px-2 md:mt-8">
            <Image
                src={icons.avatar.src}
                alt={icons.avatar.alt}
                width={icons.avatar.width}
                height={icons.avatar.height}
                className={`size-14 md:size-20 lg:size-32 rounded-[2px]`}
            />

            <div className="text-sm text-center md:text-start md:text-base lg:text-xl md:space-y-1">
                <p className="">{modifiedUsername}</p>
                <p className="">{modifiedEmail}</p>
            </div>
        </div>
    );
}

export default UserInfo;
