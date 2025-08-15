'use client';
import { icons } from '@/assets/icons';
import ContentOptions from '@/components/ContentOptions';
import useIsScrolling from '@/hooks/useIsScrolling';
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    const scrolling = useIsScrolling();
    const pathname = usePathname();
    const router = useRouter();

    const pathNameConditions = !pathname.includes('/content') && !pathname.includes('/search');

    return (
        !pathname.includes('/search') && (
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
                                {pathNameConditions && (
                                    <div className={`gap-3 text-md hidden md:flex`}>
                                        <ContentOptions pathname={pathname} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <Link href={'/search'} className="flex items-center gap-2">
                                    <MagnifyingGlassIcon className="size-7"></MagnifyingGlassIcon>
                                    <Image
                                        src={icons.avatar.src}
                                        alt={icons.avatar.alt}
                                        width={icons.avatar.width}
                                        height={icons.avatar.height}
                                        className={`size-10 rounded-[2px] ${pathname.includes('/content') && 'hidden'}`}
                                    ></Image>
                                </Link>
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
        )
    );
};

export default Header;
