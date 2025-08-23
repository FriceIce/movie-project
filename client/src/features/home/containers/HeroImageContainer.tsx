import { Vibrant } from 'node-vibrant/node';
import MobileHeroImage from './MobileHeroImage';

type Props = {
    id: number;
    posterPath: string;
    type: 'tv' | 'movie';
};

async function MobileHeroImageContainer({ posterPath, type, id }: Props) {
    const img = posterPath;
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
            <MobileHeroImage type={type} img={img} id={id} />
        </div>
    );
}

export default MobileHeroImageContainer;
