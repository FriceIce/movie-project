import { Vibrant } from 'node-vibrant/node';
import MobileHeroImage from './MobileHeroImage';

type Props = {
    contentDetails: MovieDetails | TvShowDetails;
    type: 'tv' | 'movie';
};

async function MobileHeroImageContainer({ contentDetails, type }: Props) {
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
                className={`absolute inset-0 z-[-1] translate-y-[-140px] mask-image-bottom h-[190%]`}
                style={{ backgroundColor: bgColor }}
            />
            <MobileHeroImage type={type} img={img} id={contentDetails.id} />
        </div>
    );
}

export default MobileHeroImageContainer;
