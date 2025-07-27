import { Vibrant } from 'node-vibrant/node';
import MobileHeroImage from './MobileHeroImage';

type Props = {
    img: string;
    id: number;
};

async function MobileHeroImageContainer({ img, id }: Props) {
    const vibrant = new Vibrant(img);
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
            <MobileHeroImage img={img} id={id} />
        </div>
    );
}

export default MobileHeroImageContainer;
