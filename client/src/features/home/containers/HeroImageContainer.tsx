import { Vibrant } from 'node-vibrant/node';
import MobileHeroImage from './MobileHeroImage';
import { TvShowDetails } from '@/types/TvDetails';

type Props = {
    contentDetails: MovieDetails | TvShowDetails;
};

async function MobileHeroImageContainer({ contentDetails }: Props) {
    const img = contentDetails.poster_path as string;
    console.log(img);
    const vibrant = new Vibrant('https://image.tmdb.org/t/p/w500' + img);
    const bgColor = await vibrant.getPalette().then((palette) => {
        console.log(palette.DarkVibrant?.hex);
        return palette.DarkVibrant?.hex || '';
    });

    return (
        <div className="relative px-4 py-8 md:hidden">
            <div
                className={`absolute inset-0 z-[-1] translate-y-[-100px] mask-image-bottom h-[150%]`}
                style={{ backgroundColor: bgColor }}
            />
            <MobileHeroImage img={img} id={contentDetails.id} />
        </div>
    );
}

export default MobileHeroImageContainer;
