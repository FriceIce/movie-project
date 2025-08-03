import SliderContainer from '@/containers/SliderContainer';

type Prop = {
    title: string;
    content: Movie[] | TvShow[];
    contentType: 'movie' | 'tv';
};

function TopTenContentSlider({ title, content, contentType }: Prop) {
    return (
        <div className="space-y-2 lg:space-y-4 relative">
            <h2 className="ml-3 font-bold text-base md:text-lg 2xl:text-xl">{title}</h2>
            <SliderContainer contentType={contentType} images={content} rank={true} />
        </div>
    );
}

export default TopTenContentSlider;
