import React from 'react';
import Image from 'next/image';
import { icons } from '@/assets/icons';

type Prop = {
    isDesktop: boolean;
};
const ContentOptions = ({ isDesktop }: Prop) => {
    return (
        <>
            <div
                className={`flex items-center px-3 py-1 w-max lg:border-none border border-custom-white rounded-full`}
            >
                <p>TV shows</p>
            </div>
            <div
                className={`flex items-center px-3 py-1 w-max lg:border-none border border-custom-white rounded-full`}
            >
                <p>Movies</p>
            </div>
            <div
                className={`flex items-center gap-2 px-3 py-1 w-max lg:border-none border border-custom-white rounded-full`}
            >
                <p className="">Categories</p>
                <Image
                    src={icons.chevron.src}
                    alt={icons.chevron.alt}
                    width={icons.chevron.width}
                    height={icons.chevron.height}
                    className="size-5"
                ></Image>
            </div>
        </>
    );
};

export default ContentOptions;
