'use client';
import { Vibrant } from 'node-vibrant/browser';
import React, { useEffect, useState } from 'react';
import HeroImage from './heroImage';

type Props = {
    img: string;
};

function HeroImageContainer({ img }: Props) {
    const [bgColor, setBgColor] = useState<string>('');

    useEffect(() => {
        const vibrant = new Vibrant(img);
        vibrant.getPalette().then((palette) => setBgColor(palette.DarkVibrant?.hex || ''));
    }, []);

    return (
        <div className="relative px-4 py-8">
            <div
                className={`absolute inset-[-100px] z-[-1] mask-image-bottom h-[150%]`}
                style={{ backgroundColor: bgColor }}
            />
            <HeroImage img={img} />
        </div>
    );
}

export default HeroImageContainer;
