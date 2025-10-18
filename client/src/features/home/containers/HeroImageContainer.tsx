import { Vibrant } from 'node-vibrant/node';
import MobileHeroImage from './MobileHeroImage';

type Props = {
    id: number;
    title: string;
    posterPath: string;
    backdropPath: string;
    type: 'tv' | 'movie';
    savedContent: SavedContent[] | undefined;
};

async function MobileHeroImageContainer({
    posterPath,
    title,
    backdropPath,
    type,
    id,
    savedContent,
}: Props) {
    const img = posterPath;
    const vibrant = new Vibrant('https://image.tmdb.org/t/p/w500' + img);
    const bgColor = await vibrant.getPalette().then((palette) => {
        return palette.DarkVibrant?.hex || '';
    });

    return (
        <div className="relative px-4 py-8 md:hidden">
            <div
                className={`absolute inset-0 z-[-1] translate-y-[-140px] mask-image-bottom h-[190%]`}
                style={{ backgroundColor: bgColor }}
            />
            <MobileHeroImage
                title={title}
                type={type}
                img={{ backdropPath, posterPath }}
                id={id}
                savedContent={savedContent}
            />
        </div>
    );
}

export default MobileHeroImageContainer;
