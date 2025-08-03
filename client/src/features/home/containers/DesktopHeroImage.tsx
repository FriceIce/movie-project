'use client';
import { poppins } from '@/assets/fonts';
import ContentActionBtns from '@/components/ContentActionBtns';
import { retrieveCompanyLogo } from '@/utils/retrieveCompanyLogo';
import Image from 'next/image';

type Prop = {
    contentDetails: MovieDetails | TvShow;
};

function DesktopHeroImage({ contentDetails }: Prop) {
    const companyLogo =
        'production_companies' in contentDetails &&
        retrieveCompanyLogo(contentDetails.production_companies);

    return (
        <>
            <div className="relative hidden md:block w-dvw h-[50vh] lg:min-h-[600px] 2xl:min-h-[700px]">
                <Image
                    src={`https://image.tmdb.org/t/p/w1280` + contentDetails.backdrop_path}
                    width={1280}
                    height={720}
                    alt="poster"
                    className="absolute inset-0 z-[-1] translate-y-[-115px] object-cover object-center brightness-[80%] w-full mask-image-bottom"
                />

                <div
                    className={`space-y-6 inset-0 w-[45%] flex flex-col justify-center 2xl:justify-end translate-x-10 max-w-[900px] min-h-[600px] ${poppins.className}`}
                >
                    {companyLogo && (
                        <Image
                            src={companyLogo}
                            alt="production team logo"
                            width={200}
                            height={200}
                            className={`${companyLogo ? 'block' : 'hidden'} object-contain`}
                        />
                    )}
                    <h1 className="font-bold text-6xl text-white 2xl:text-8xl">
                        {'title' in contentDetails ? contentDetails.title : contentDetails.name}
                    </h1>
                    <p className="font-[15px] max-h-24 overflow-hidden line-clamp-4 2xl:text-[20px] 2xl:line-clamp-3">
                        {contentDetails.overview}
                    </p>
                    <div className="space-x-3">
                        <ContentActionBtns id={contentDetails.id} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default DesktopHeroImage;
