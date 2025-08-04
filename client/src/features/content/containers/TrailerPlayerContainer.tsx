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

    // Custom hook
    const screenWidth = useMediaQuery(1280);

    // ref for trailer width and height.
    const imageRefMobile = useRef<HTMLImageElement | null>(null);
    const imageRefDesktop = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (trailer) setVideoStarted(true);
    }, [setVideoStarted]);

    return (
        <div aria-label="Container for trailer and content backdrop image">
            {!videoStarted && (
                <>
                    <Image
                        ref={imageRefMobile}
                        src={`https://image.tmdb.org/t/p/w780/` + contentDetails.backdrop_path}
                        alt={'content Image'}
                        width={780}
                        height={439}
                        style={{ height: 'auto' }}
                        className="h-auto w-full mask-image-bottom lg:hidden"
                    />
                    <Image
                        ref={imageRefDesktop}
                        src={`https://image.tmdb.org/t/p/${screenWidth ? 'original' : 'w1280'}/${contentDetails.backdrop_path}`}
                        alt={'content Image'}
                        width={1280}
                        height={720}
                        style={{ height: 'auto' }}
                        className="h-auto w-full mask-image-bottom hidden lg:block"
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
