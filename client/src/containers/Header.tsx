'use client';
import { icons } from '@/assets/icons';
import ContentOptions from '@/components/ContentOptions';
import useIsScrolling from '@/hooks/useIsScrolling';
import Image from 'next/image';

const Header = () => {
    const isScrolling = useIsScrolling();
    return (
        <header
            className={`sticky inset-0 z-[2] space-y-3 h-max w-full py-4 pl-5 pr-5 transition duration-100 
        ${isScrolling ? 'bg-[#00000060]' : 'bg-transparent'}`}
        >
            <section className={`flex items-center`}>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-8">
                        <div className="">
                            <Image
                                src={icons.logo.square}
                                alt={icons.logo.alt}
                                height={500}
                                width={500}
                                priority
                                className="h-[45px] w-max object-contain object-center"
                            />
                        </div>
                        <div className={`gap-3 text-md hidden lg:flex`}>
                            <ContentOptions isDesktop />
                        </div>
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
            <section className={`lg:hidden block`}>
                <div className="flex gap-3 text-xs">
                    <ContentOptions isDesktop />
                </div>
            </section>
        </header>
    );
};

export default Header;
