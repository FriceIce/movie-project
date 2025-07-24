import Image from 'next/image';
import { movieDetails } from '@/assets/mockData';
import { retrieveCompanyLogo } from '@/utils/retrieveCompanyLogo';

type Prop = {
    img: string;
};

function DesktopHeroImage({ img }: Prop) {
    const companyLogo = retrieveCompanyLogo(movieDetails.production_companies);

    return (
        <div className="relative hidden md:block w-dvw h-[50vh]">
            <Image
                src={img}
                width={1280}
                height={720}
                alt="poster"
                className="absolute inset-0 z-[-1] translate-y-[-115px] object-cover object-center brightness-[80%] w-full mask-image-bottom"
            />

            <div className="space-y-6 absolute inset-0 w-[45%] flex flex-col justify-center translate-x-10 max-w-[900px] min-h-[600px]">
                <Image
                    src={companyLogo}
                    alt="production team logo"
                    width={200}
                    height={200}
                    className={`${companyLogo ? 'block' : 'hidden'} object-contain`}
                />
                <h1 className="font-bold text-6xl text-white 2xl:text-8xl">{movieDetails.title}</h1>
                <p className="font-[15px] max-h-24 overflow-hidden line-clamp-4 2xl:text-[20px] 2xl:line-clamp-3">
                    {movieDetails.overview}
                </p>
                <div className="space-x-3">
                    <button className="px-6 py-[8px] rounded bg-custom-white text-black 2xl:py-[11px]">
                        See Details
                    </button>
                    <button className="px-6 py-[8px] rounded bg-custom-cyanBlue 2xl:py-[11px]">
                        Add to List
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DesktopHeroImage;
