import { poppins } from '@/assets/fonts';
import { movieDetails } from '@/assets/mockData';
import { videos } from '@/assets/mockData/videos';
import Credits from '@/features/content/containers/Credits';
import RelatedMediaSection from '@/features/content/containers/RelatedMediaSection';
import TrailerPlayerContainer from '@/features/content/containers/TrailerPlayerContainer';
import { filterTmdbVideos } from '@/features/content/utils/filterTMdbVideos';
import { formatRuntime } from '@/features/content/utils/formatRuntime';
import { PlusIcon } from '@heroicons/react/16/solid';

type Props = {
    params: {
        id: string;
    };
};
const Content = ({ params }: Props) => {
    const filteredVideos = filterTmdbVideos(videos);

    return (
        <div>
            <TrailerPlayerContainer
                imageSrc={'w780' + movieDetails.backdrop_path}
                trailer={filteredVideos.trailer}
            />

            <div className="px-2 pt-0">
                <div className="space-y-5">
                    <section className="space-y-3">
                        <h1 className={`text-2xl text-white font-bold ${poppins.className} pt-2`}>
                            {movieDetails.title}
                        </h1>
                        <div className="flex gap-2 text-xs">
                            <p>{movieDetails.release_date.slice(0, 4)}</p>
                            <p>{formatRuntime(movieDetails.runtime)}</p>
                            <p>{movieDetails.origin_country[0]}</p>
                        </div>
                        <button className="flex gap-1 items-center justify-center bg-white text-black text-sm font-semibold rounded-[2px] w-full h-[42px]">
                            <PlusIcon className="size-5 text-black" />
                            <p className="">My List</p>
                        </button>
                        <div className="space-y-2">
                            <p className="text-xs pt-2" style={{ lineHeight: '1.5' }}>
                                {movieDetails.overview}
                            </p>

                            <Credits movieDetails={movieDetails} />
                        </div>
                    </section>

                    <section className="">
                        <RelatedMediaSection label="Includes content such as recommendations and collection." />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Content;
