'use client';
import { icons } from '@/assets/icons';
import useIsScrolling from '@/hooks/useIsScrolling';
import Image from 'next/image';
import React from 'react';

const Header = () => {
    const isScrolling = useIsScrolling();
    return (
        <header
            className={`sticky inset-0 z-[2] space-y-3 h-max w-full py-4 px-4 transition duration-100 
        ${isScrolling ? 'bg-[#00000060]' : 'bg-transparent'}`}
        >
            <section className="flex items-center">
                <div className="flex items-center justify-between w-full">
                    <div className="">
                        <Image
                            src={icons.logo.square}
                            alt={icons.logo.alt}
                            height={500}
                            width={500}
                            className="h-[45px] w-max object-contain object-center"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Image
                            src={icons.search.notActive}
                            alt={icons.search.alt}
                            width={icons.search.width}
                            height={icons.search.height}
                            className="size-6 rotate-[20deg]"
                        ></Image>
                        <Image
                            src={icons.avatar.src}
                            alt={icons.avatar.alt}
                            width={icons.avatar.width}
                            height={icons.avatar.height}
                            className="size-10"
                        ></Image>
                    </div>
                </div>
            </section>
            <section className="">
                <div className="flex gap-3 text-xs">
                    <div className="flex items-center px-3 py-1 w-max border border-custom-white rounded-full">
                        <p>TV shows</p>
                    </div>
                    <div className="flex items-center px-3 py-1 w-max border border-custom-white rounded-full">
                        <p>Movies</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 w-max border border-custom-white rounded-full">
                        <p className="">Categories</p>
                        <Image
                            src={icons.chevron.src}
                            alt={icons.chevron.alt}
                            width={icons.chevron.width}
                            height={icons.chevron.height}
                            className="size-5"
                        ></Image>
                    </div>
                </div>
            </section>
        </header>
    );
};

export default Header;
