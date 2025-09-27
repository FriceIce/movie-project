'use client';
import { poppins } from '@/assets/fonts';
import ContentActionBtns from '@/components/ContentActionBtns';
import SaveContentIcons from '@/features/content/containers/saveContent/SaveContentIcons';
import { retrieveCompanyLogo } from '@/utils/retrieveCompanyLogo';
import Image from 'next/image';

type Props = {
    id: number;
    title: string;
    overview: string;
    backdropPath: string;
    type: 'tv' | 'movie';
    savedContent: SavedContent[] | undefined;
    posterPath: string;
    companyLogo?: ProductionCompany[];
};

function DesktopHeroImage(props: Props) {
    const { overview, id, companyLogo, type, backdropPath, title, savedContent, posterPath } =
        props;
    const extractCompanyLogo = companyLogo && retrieveCompanyLogo(companyLogo);

    return (
        <>
            <div className="relative hidden md:block w-dvw h-[50vh] lg:min-h-[600px] 2xl:min-h-[700px]">
                <Image
                    src={`https://image.tmdb.org/t/p/w1280` + backdropPath}
                    width={1280}
                    height={720}
                    alt="poster"
                    className="absolute inset-0 z-[-1] translate-y-[-115px] object-cover object-center brightness-[80%] w-full mask-image-bottom"
                />

                <div
                    className={`space-y-6 inset-0 w-[45%] flex flex-col justify-center 2xl:justify-end translate-x-10 max-w-[900px] min-h-[600px] ${poppins.className}`}
                >
                    {extractCompanyLogo && (
                        <Image
                            src={extractCompanyLogo}
                            alt="production team logo"
                            width={185}
                            height={100}
                            className={`${companyLogo ? 'block' : 'hidden'} object-contain`}
                        />
                    )}
                    <h1 className="font-bold text-6xl text-white 2xl:text-8xl">{title}</h1>
                    <p className="font-[15px] max-h-24 overflow-hidden line-clamp-4 2xl:text-[20px] 2xl:line-clamp-3">
                        {overview}
                    </p>
                    <div className="space-x-3 flex">
                        <ContentActionBtns
                            type={type}
                            id={id}
                            savedContent={savedContent}
                            images={{ posterPath, backdropPath }}
                            children={
                                <SaveContentIcons
                                    contentId={String(id)}
                                    savedContent={savedContent}
                                    screen="heroImg"
                                />
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default DesktopHeroImage;
