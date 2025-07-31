import { poppins } from '@/assets/fonts';
import Credits from '@/features/content/containers/Credits';
import RelatedMediaSection from '@/features/content/containers/RelatedMediaSection';
import TrailerPlayerContainer from '@/features/content/containers/TrailerPlayerContainer';
import { filterTmdbVideos } from '@/features/content/utils/filterTmdbVideos';
import { formatRuntime } from '@/features/content/utils/formatRuntime';
import { TvShowDetails } from '@/types/TvDetails';
import { fetchJson } from '@/utils/fetchJson';
import { PlusIcon } from '@heroicons/react/16/solid';

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzUzODg1ODE1fQ.mXwZBR96fEgS6XG4sVh9l3pVNrFfYauQjteQnDbg9OI';

type Props = {
    params: {
        id: string;
        type: string;
    };
};
async function Content({ params }: Props) {
    const { id: contentId, type } = params;

    const [videos, contentDetails, recommendations, credits] = await Promise.all([
        fetchJson<FetchResponse<VideosResponse>>(token, `/videos/${type}/${contentId}`),
        fetchJson<FetchResponse<MovieDetails | TvShowDetails>>(
            token,
            `/details/${type}/${contentId}`
        ),
        fetchJson<FetchResponse<Recommendations>>(token, `/recommendations/1/${type}/${contentId}`),
        fetchJson<FetchResponse<Credits>>(token, `/credits/${type}/${contentId}`),
    ]);

    // Instead of repeating contentDetails.data, I initialized a variable to store its value.
    const content = contentDetails.data;

    const collectionId =
        'belongs_to_collection' in contentDetails.data
            ? contentDetails.data.belongs_to_collection?.id
            : null;

    // The collection endpoint depends on the details fetch, which is why it is not include in the Promise.all above
    const collection = collectionId
        ? await fetchJson<FetchResponse<Collection>>(token, `/collection/${collectionId}`)
        : null;

    const filteredVideos = filterTmdbVideos(videos.data.results);

    // Initiated variables with values based on which content type is fetched, `movie` or `tv`.
    const runtime = 'runtime' in content && content.runtime;
    const releaseDate = 'release_date' in content ? content.release_date : content.first_air_date;
    const title = 'title' in content ? content.title : content.name;

    return (
        <div>
            <TrailerPlayerContainer
                contentDetails={content}
                imageSrc={'w780' + content.backdrop_path}
                trailer={filteredVideos.trailer}
            />

            <div className="px-2 pt-0">
                <div className="space-y-5">
                    <section className="space-y-3">
                        <h1 className={`text-2xl text-white font-bold ${poppins.className} pt-2`}>
                            {title}
                        </h1>
                        <div className="flex gap-2 text-xs">
                            <p>{content.origin_country[0]}</p>
                            <p>{releaseDate.slice(0, 4)}</p>
                            {runtime && <p>{formatRuntime(runtime)}</p>}
                        </div>
                        <button className="flex gap-1 items-center justify-center bg-white text-black text-sm font-semibold rounded-[2px] w-full h-[42px]">
                            <PlusIcon className="size-5 text-black" />
                            <p className="">My List</p>
                        </button>
                        <div className="space-y-2">
                            <p className="text-xs pt-2" style={{ lineHeight: '1.5' }}>
                                {content.overview}
                            </p>

                            <Credits contentDetails={content} credits={credits.data} />
                        </div>
                    </section>

                    <section className="">
                        <RelatedMediaSection
                            label="Includes content such as recommendations and collection."
                            collection={collection ? collection.data : null}
                            recommendations={recommendations.data.results}
                        />
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Content;
