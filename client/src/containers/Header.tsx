'use client';
import { icons } from '@/assets/icons';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { InputContext } from '@/context/SearchContext';
import { ReactNode, useContext, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import DesktopSearchContainer from './DesktopSearchContainer';
import ContentOptions from '@/components/ContentOptions';
import DesktopInputfield from './DesktopInputfield';
import useIsScrolling from '@/hooks/useIsScrolling';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    children: ReactNode;
};

const Header = ({ children }: Props) => {
    const [openInput, setOpenInput] = useState<boolean>(false);
    const inputContext = useContext(InputContext);
    const desktopView = useMediaQuery(768);
    const scrolling = useIsScrolling();
    const pathname = usePathname();
    const router = useRouter();

    // This conditions is used for conditionally rendering the menu options.
    const pathNameConditions = !pathname.includes('/content') && !pathname.includes('/search');

    return (
        <>
            {!pathname.includes('/search') && (
                <header
                    className={`space-y-3 sticky inset-0 z-[2] h-max w-full py-4 px-5 transition duration-100  
        ${scrolling ? 'bg-[#000000cc]' : 'bg-transparent'}`}
                >
                    <div className="absolute z-[-1] bg-[#000000a6] inset-0 mask-image-bottom"></div>
                    <div className={`mx-auto ${pathname.includes('/content') && 'max-w-[1300px]'}`}>
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

                                    <div className={`gap-3 text-md hidden md:flex`}>
                                        <ContentOptions pathname={pathname} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    {desktopView && (
                                        <DesktopInputfield
                                            desktopView={desktopView}
                                            inputContext={inputContext}
                                            openInputfield={openInput}
                                            setOpenInputfield={setOpenInput}
                                        />
                                    )}

                                    {!desktopView && (
                                        <Link href={'/search'}>
                                            <MagnifyingGlassIcon className="size-7" />
                                        </Link>
                                    )}

                                    <Image
                                        src={icons.avatar.src}
                                        alt={icons.avatar.alt}
                                        width={icons.avatar.width}
                                        height={icons.avatar.height}
                                        className={`size-10 rounded-[2px] ${pathname.includes('/content') && 'hidden'}`}
                                    ></Image>
                                </div>
                            </div>
                        </section>
                        {pathNameConditions && (
                            <section className={`md:hidden`}>
                                <div className={`flex gap-2 pt-4`}>
                                    <ContentOptions pathname={pathname} />
                                </div>
                            </section>
                        )}
                    </div>
                </header>
            )}

            {!inputContext?.input ? (
                <>{children}</>
            ) : (
                <>
                    {desktopView ? (
                        // PROBLEM: The application renders only this component when the user changes from mobile screen to desktop with an active input value.
                        <DesktopSearchContainer searchTerm={inputContext?.input} />
                    ) : (
                        <>{children}</>
                    )}
                </>
            )}
        </>
    );
};

export default Header;
