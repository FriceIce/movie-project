import SliderContainer from '@/containers/SliderContainer';

type Prop = {
    label?: string;
    contentType: 'movie' | 'tv';
    title: string;
    images: Movie[] | TvShow[];
};

function ContentSlider({ title, images, contentType }: Prop) {
    return (
        <div className="space-y-1">
            <h2 className="ml-3 font-bold text-base md:text-lg 2xl:text-xl">{title}</h2>
            <SliderContainer images={images} contentType={contentType} />
        </div>
    );
}

export default ContentSlider;
