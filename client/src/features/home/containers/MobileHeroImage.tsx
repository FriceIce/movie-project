import Image from 'next/image';

type Props = {
    img: string;
};

function MobileHeroImage({ img }: Props) {
    return (
        <section className="relative flex items-end w-[95%] mx-auto rounded-lg h-[500px] shadow-whiteShadow">
            <Image
                src={img}
                crossOrigin="anonymous"
                alt="movie poster"
                width={500}
                height={500}
                priority
                className="absolute inset-0 z-[-1] h-full w-full object-cover object-top rounded-lg brightness-[70%]"
            />
            <div className="flex justify-center gap-4 w-full p-4 relative">
                <div className="absolute z-[-1] inset-0 bg-[#000] h-[200%] translate-y-[-50%] mask-image-top rounded-lg" />
                <button
                    type="button"
                    className="text-custom-black px-4 py-1 bg-white rounded-[2px] shadow-md"
                >
                    See Details
                </button>
                <button
                    type="button"
                    className="px-4 py-1 rounded-[2px] bg-custom-cyanBlue shadow-md"
                >
                    Add To List
                </button>
            </div>
        </section>
    );
}

export default MobileHeroImage;
