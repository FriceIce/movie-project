'use client';
import { icons } from '@/assets/icons';
import ContentOptions from '@/components/ContentOptions';
import useIsScrolling from '@/hooks/useIsScrolling';
import { ArrowLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
    const [openOptions, setOpenOptions] = useState<boolean>(false);
    const isScrolling = useIsScrolling();
    const pathname = usePathname();
    const router = useRouter();

    return (
        <header
            className={`space-y-3 sticky inset-0 z-[2] h-max w-full py-4 pl-5 pr-5 transition duration-100  
        ${isScrolling ? 'bg-[#000000cc]' : 'bg-transparent'}`}
        >
            <div className="absolute z-[-1] bg-[#000000a6] inset-0 mask-image-bottom"></div>
            <div className="max-w-[1300px] mx-auto">
                <section className={`flex items-center`}>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-8">
                            <div className="flex items-end gap-2">
                                <Image
                                    src={icons.logo.square}
                                    alt={icons.logo.alt}
                                    height={500}
                                    width={500}
                                    priority
                                    className={`h-[45px] w-max object-contain object-center ${pathname.includes('/content') && 'hidden'}`}
                                />
                                <button
                                    className={`mx-2 p-[1px] ${pathname.includes('/content') ? 'block' : 'hidden'}`}
                                    onClick={() => router.back()}
                                >
                                    <ArrowLeftIcon className="size-7 rounded-full" />
                                </button>
                            </div>
                            {/* <div className={`gap-3 text-md hidden md:flex`}>
                                <ContentOptions isDesktop />
                            </div> */}
                        </div>
                        <div className="flex items-center gap-2">
                            <MagnifyingGlassIcon className="size-7"></MagnifyingGlassIcon>
                            <Image
                                src={icons.avatar.src}
                                alt={icons.avatar.alt}
                                width={icons.avatar.width}
                                height={icons.avatar.height}
                                className={`size-10 ${pathname.includes('/content') && 'hidden'}`}
                            ></Image>
                        </div>
                    </div>
                </section>
                <section className={`md:hidden h-[30px] hidden`}>
                    <div
                        className={`relative flex gap-3 text-xs border w-max  rounded-lg transition-all duration-200 ${openOptions ? 'translate-x-0' : 'translate-x-[-107%]'}`}
                    >
                        <ContentOptions />
                        <button
                            className="absolute right-[-23px] top-0 bg-custom-white border size-[30px] rounded-full grid place-items-center"
                            onClick={() => setOpenOptions((prev) => !prev)}
                        >
                            <ChevronRightIcon
                                className={`size-6 transition-all text-black ${openOptions ? 'rotate-180' : 'rotate-0'}`}
                            />
                        </button>
                    </div>
                </section>
            </div>
        </header>
    );
};

export default Header;
