'use client';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Prop = {
    contentDetails: MovieDetails | TvShowDetails;
    trailer: TmdbVideoObject | null;
};
function TrailerPlayerContainer({ contentDetails, trailer }: Prop) {
    const [videoStarted, setVideoStarted] = useState<boolean>(false);
    const screenWidth = useMediaQuery(1280);

    const imagePath = contentDetails.backdrop_path;
    const mobileImage = imagePath
        ? `https://image.tmdb.org/t/p/w780/${imagePath}`
        : '/trailer-image-placeholder.svg';

    const desktopImage = imagePath
        ? `https://image.tmdb.org/t/p/${screenWidth ? 'original' : 'w1280'}/${imagePath}`
        : '/trailer-image-placeholder.svg';

    // ref for trailer width and height.
    const imageRefMobile = useRef<HTMLImageElement | null>(null);
    const imageRefDesktop = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (trailer) setVideoStarted(true);
    }, [setVideoStarted, trailer]);

    return (
        <div aria-label="Container for trailer and content backdrop image">
            {!videoStarted && (
                <>
                    <Image
                        ref={imageRefMobile}
                        src={mobileImage}
                        alt={'media image'}
                        width={780}
                        height={439}
                        style={{ height: 'auto' }}
                        className={`h-auto ${imagePath ? 'w-full mask-image-bottom' : 'w-1/2 mx-auto mb-4'} lg:hidden`}
                    />
                    <Image
                        ref={imageRefDesktop}
                        src={desktopImage}
                        alt={'media image'}
                        width={1280}
                        height={720}
                        style={{ height: 'auto' }}
                        className={`h-auto ${imagePath ? 'w-full mask-image-bottom' : 'w-1/2 mx-auto'} hidden lg:block`}
                    />
                </>
            )}

            {videoStarted && (
                <>
                    <iframe
                        src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&mute=1`}
                        allowFullScreen
                        title="Trailer"
                        style={{
                            width: imageRefMobile.current
                                ? imageRefMobile.current.offsetWidth
                                : 'auto',
                            height: imageRefMobile.current
                                ? imageRefMobile.current.offsetHeight
                                : 'auto',
                        }}
                        className={`w-dvw lg:hidden ${!trailer && 'hidden'}`}
                    ></iframe>
                    <iframe
                        src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&mute=1`}
                        allowFullScreen
                        title="Trailer"
                        style={{
                            width: imageRefDesktop.current
                                ? imageRefDesktop.current.offsetWidth
                                : 'auto',
                            height: imageRefDesktop.current
                                ? imageRefDesktop.current.offsetHeight
                                : 'auto',
                        }}
                        className={`w-dvw hidden lg:block ${!trailer && 'hidden'}`}
                    ></iframe>
                </>
            )}
        </div>
    );
}

export default TrailerPlayerContainer;
