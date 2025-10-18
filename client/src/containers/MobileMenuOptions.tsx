'use client';

import { icons } from '@/assets/icons';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileContainer from './ProfileContainer';
import SignOutContainer from './SignOutContainer';

export function MobileMenuOptions() {
    const path = usePathname();
    function initialOption(path: string) {
        if (path.includes('home')) return 0;
        if (path.includes('search')) return 1;
        if (path.includes('profile')) return 2;
        return null;
    }
    const [active, setActive] = useState<0 | 1 | 2 | null>(initialOption(path));

    useEffect(() => {
        setActive(initialOption(path));
    }, [path]);
    return (
        <div className="flex justify-between items-center gap-4 w-full bg-[#101010d1] h-[70px] px-8 md:hidden">
            <div role="button">
                <Link href={'/home'} className="flex flex-col items-center justify-center gap-2">
                    {active === 0 ? (
                        <Image
                            src={icons.home.active}
                            alt={icons.home.alt}
                            height={icons.home.size}
                            width={icons.home.size}
                            className="size-6"
                        />
                    ) : (
                        <Image
                            src={icons.home.notActive}
                            alt={icons.home.alt}
                            height={icons.home.size}
                            width={icons.home.size}
                            className="size-6"
                        />
                    )}
                    {<p className={`text-xs text-gray ${active === 0 && 'text-white'}`}>Home</p>}
                </Link>
            </div>

            <div role="button">
                <Link href={'/search'} className="flex flex-col items-center justify-center gap-2">
                    {active === 1 ? (
                        <Image
                            src={icons.search.active}
                            alt={icons.search.alt}
                            height={icons.search.height}
                            width={icons.search.width}
                            className="size-6"
                        />
                    ) : (
                        <Image
                            src={icons.search.notActive}
                            alt={icons.search.alt}
                            height={icons.search.height}
                            width={icons.search.width}
                            className="size-6"
                        />
                    )}
                    {<p className={`text-xs text-gray ${active === 1 && 'text-white'}`}>Search</p>}
                </Link>
            </div>

            <div role="button">
                <Link
                    href={'/profile'}
                    className="flex flex-col items-center justify-center gap-2 w-max"
                >
                    {path !== '/profile' && (
                        <>
                            <ProfileContainer />
                            <p className={`text-xs text-gray ${active === 2 && 'text-white'}`}>
                                Profile
                            </p>
                        </>
                    )}

                    {path === '/profile' && (
                        <>
                            <SignOutContainer />
                            <p className={`text-xs text-gray ${active === 2 && 'text-white'}`}>
                                Log out
                            </p>
                        </>
                    )}
                </Link>
            </div>
        </div>
    );
}
