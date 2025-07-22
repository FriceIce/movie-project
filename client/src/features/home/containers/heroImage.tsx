import Image from 'next/image';

type Props = {
    img: string;
};

function HeroImage({ img }: Props) {
    return (
        <section className="relative flex items-end w-[95%] mx-auto rounded-lg h-[500px] md:hidden shadow-whiteShadow">
            <Image
                src={img}
                crossOrigin="anonymous"
                alt="movie poster"
                width={500}
                height={500}
                priority
                className="absolute inset-0 z-[-1] h-full w-full object-cover object-top rounded-lg"
            />
            <div className="flex gap-4 w-full p-4 font-semibold relative">
                <div className="absolute z-[-1] inset-0 bg-[#000] h-[200%] translate-y-[-50%] mask-image-top rounded-lg" />
                <button
                    type="button"
                    className="flex-1 text-custom-black px-2 py-1 bg-white rounded-[2px] shadow-md"
                >
                    See Details
                </button>
                <button type="button" className="flex-1 rounded-[2px] bg-custom-cyanBlue shadow-md">
                    My List
                </button>
            </div>
        </section>
    );
}

export default HeroImage;
