'use client';
import { icons } from '@/assets/icons';
import { useSearchContext } from '@/context/SearchContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import ContentOptions from '@/components/ContentOptions';
import useIsScrolling from '@/hooks/useIsScrolling';
import DesktopInputfield from './DesktopInputfield';
import DesktopSearchContainer from './DesktopSearchContainer';
import ProfileContainer from './ProfileContainer';

type Props = {
    username: string | undefined;
    children: ReactNode;
};

const Header = ({ children, username }: Props) => {
    const [openInput, setOpenInput] = useState<boolean>(false);
    const inputContext = useSearchContext();
    const desktopView = useMediaQuery(768);
    const scrolling = useIsScrolling();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        setOpenInput(false);
    }, [pathname]);

    // This conditions is used for conditionally rendering the menu options.
    const pathNameConditions = !pathname.includes('/content') && !pathname.includes('/search');

    return (
        <>
            {!pathname.includes('/search') && pathname !== '/' && (
                <header
                    className={`space-y-3 sticky inset-0 z-[2] h-max w-full py-4 px-5 transition duration-100  
        ${scrolling ? 'bg-[#000000cc]' : 'bg-transparent'}`}
                >
                    <div className="absolute z-[-1] bg-[#101010d1] inset-0 mask-image-bottom"></div>
                    <div
                        className={`flex mx-auto ${pathname.includes('/content') && 'max-w-[1300px]'}`}
                    >
                        <section className={`flex items-center w-full`}>
                            <div className="flex items-center md:justify-between w-full">
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
                                    <div className="flex flex-col items-center gap-1">
                                        <DesktopInputfield
                                            desktopView={desktopView}
                                            inputContext={inputContext}
                                            openInputField={openInput}
                                            setOpenInputField={setOpenInput}
                                        />
                                        {!openInput && (
                                            <p className="hidden text-xs md:block">Search</p>
                                        )}
                                    </div>

                                    <div className="hidden md:block">
                                        <ProfileContainer username={username} />
                                    </div>
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
