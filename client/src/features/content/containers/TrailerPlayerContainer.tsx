'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Prop = {
    imageSrc: string;
    trailer: TmdbVideoObject | null;
};
function TrailerPlayerContainer({ trailer, imageSrc }: Prop) {
    const [videoStarted, setVideoStarted] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => trailer && setVideoStarted(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div aria-label="Container for trailer and content backdrop image">
            {!videoStarted && (
                <>
                    <Image
                        src={'https://image.tmdb.org/t/p/' + imageSrc}
                        alt={'content Image'}
                        width={780}
                        height={439}
                        style={{ height: 'auto' }}
                        className="h-auto w-full mask-image-bottom lg:hidden"
                    />
                    <Image
                        src={'https://image.tmdb.org/t/p/' + imageSrc}
                        alt={'content Image'}
                        width={1280}
                        height={720}
                        style={{ height: 'auto' }}
                        className="h-auto w-full mask-image-bottom hidden lg:block"
                    />
                </>
            )}

            {videoStarted && (
                <iframe
                    src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&mute=1`}
                    allowFullScreen
                    title="Trailer"
                    className={`h-[220px] sm:h-[350px] w-dvw ${!trailer && 'hidden'}`}
                ></iframe>
            )}
        </div>
    );
}

export default TrailerPlayerContainer;
