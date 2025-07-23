'use client';
import { Vibrant } from 'node-vibrant/browser';
import React, { useEffect, useState } from 'react';
import MobileHeroImage from './MobileHeroImage';

type Props = {
    img: string;
};

function MobileHeroImageContainer({ img }: Props) {
    const [bgColor, setBgColor] = useState<string>('');

    useEffect(() => {
        const vibrant = new Vibrant(img);
        vibrant.getPalette().then((palette) => {
            setBgColor(palette.DarkVibrant?.hex || '');
            console.log(palette);
        });
    }, []);

    return (
        <div className="relative px-4 py-8 md:hidden">
            <div
                className={`absolute inset-0 z-[-1] translate-y-[-100px] mask-image-bottom h-[150%]`}
                style={{ backgroundColor: bgColor }}
            />
            <MobileHeroImage img={img} />
        </div>
    );
}

export default MobileHeroImageContainer;
