'use client';
import ContentActionBtns from '@/components/ContentActionBtns';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Image from 'next/image';

type Props = {
    img: string;
    id: number;
    type: 'tv' | 'movie';
};

function MobileHeroImage({ img, id, type }: Props) {
    const mobileScreenWidth = useMediaQuery(768); // We're seeking after a false value.
    return (
        <>
            {!mobileScreenWidth && (
                <section className="flex flex-col w-[95%] mx-auto rounded-lg shadow-whiteShadow">
                    <Image
                        src={'https://image.tmdb.org/t/p/w500' + img}
                        crossOrigin="anonymous"
                        alt="movie poster"
                        width={500}
                        height={500}
                        priority
                        className="h-full w-full object-cover object-top rounded-t-lg brightness-[70%] mask-image-mobile-poster"
                    />
                    <div className="flex justify-center gap-4 w-full p-4 relative">
                        <div className="absolute z-[-1] inset-0 bg-[#000] h-[200%] translate-y-[-50%] mask-image-top rounded-lg" />
                        <ContentActionBtns type={type} id={id} />
                    </div>
                </section>
            )}
        </>
    );
}

export default MobileHeroImage;
