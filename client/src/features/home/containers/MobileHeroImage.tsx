import Image from 'next/image';

type Props = {
    img: string;
};

function MobileHeroImage({ img }: Props) {
    return (
        <section className="flex flex-col w-[95%] mx-auto rounded-lg shadow-whiteShadow">
            <Image
                src={img}
                crossOrigin="anonymous"
                alt="movie poster"
                width={500}
                height={500}
                priority
                className="h-full w-full object-cover object-top rounded-t-lg brightness-[70%] mask-image-mobile-poster"
            />
            <div className="flex justify-center gap-4 w-full p-4 relative">
                <div className="absolute z-[-1] inset-0 bg-[#000] h-[200%] translate-y-[-50%] mask-image-top rounded-lg" />
                <button
                    type="button"
                    className="text-custom-black text-xs px-6 py-2 bg-white rounded-[2px] shadow-md"
                >
                    See Details
                </button>
                <button
                    type="button"
                    className="px-6 py-2 rounded-[2px] bg-custom-cyanBlue text-xs shadow-md"
                >
                    Add To List
                </button>
            </div>
        </section>
    );
}

export default MobileHeroImage;
