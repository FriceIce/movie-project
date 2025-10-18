import { poppins } from '@/assets/fonts';
import Credits from '@/features/content/containers/Credits';
import RelatedMediaSection from '@/features/content/containers/RelatedMediaSection';
import DesktopSaveContent from '@/features/content/containers/saveContent/DesktopSaveContent';
import MobileSaveContent from '@/features/content/containers/saveContent/MobileSaveContent';
import TrailerPlayerContainer from '@/features/content/containers/TrailerPlayerContainer';
import { filterTmdbVideos } from '@/features/content/utils/filterTmdbVideos';
import { formatRuntime } from '@/features/content/utils/formatRuntime';
import { fetchJson } from '@/utils/fetchJson';
import getToken from '@/utils/getToken';
import { retrieveSavedContent } from '@/utils/saveDeleteRetrieveContent';
import SaveContentIcons from '@/features/content/containers/saveContent/SaveContentIcons';

type Props = {
    params: {
        id: string;
        type: string;
    };
};

async function Content({ params }: Props) {
    const { id: contentId, type } = params;
    const token = await getToken();
    const savedContent = await retrieveSavedContent(token);

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
    const seasons = 'seasons' in content && content.seasons.length;

    return (
        <div className="max-w-[1300px] mx-auto">
            <TrailerPlayerContainer contentDetails={content} trailer={filteredVideos.trailer} />

            <div className="px-2 pt-0 lg:px-4 2xl:px-0">
                <div className="space-y-5">
                    <section className="space-y-3">
                        <h1
                            className={`text-2xl sm:text-3xl lg:text-5xl text-white font-bold ${poppins.className} pt-2 lg:pt-6`}
                        >
                            {title}
                        </h1>
                        <div className="flex items-center gap-2 text-xs sm:text-sm lg:text-base">
                            {seasons && <p className="">{seasons} Seasons</p>}
                            <p>{releaseDate.slice(0, 4)}</p>
                            {runtime && <p>{formatRuntime(runtime)}</p>}
                            <p>{content.origin_country[0]}</p>
                            <DesktopSaveContent
                                contentId={contentId}
                                contentType={type as 'movie' | 'tv'}
                                images={{
                                    posterPath: content.poster_path,
                                    backdropPath: content.backdrop_path,
                                }}
                                savedContent={savedContent?.data}
                            >
                                <SaveContentIcons
                                    screen="desktop"
                                    contentId={contentId}
                                    savedContent={savedContent?.data}
                                />
                            </DesktopSaveContent>
                        </div>
                        <MobileSaveContent
                            contentId={contentId}
                            contentType={type as 'movie' | 'tv'}
                            images={{
                                posterPath: content.poster_path,
                                backdropPath: content.backdrop_path,
                            }}
                            savedContent={savedContent?.data}
                        >
                            <SaveContentIcons
                                screen="mobile"
                                contentId={contentId}
                                savedContent={savedContent?.data}
                            />
                        </MobileSaveContent>
                        <div className="space-y-2 md:flex gap-4 text-xs sm:text-sm">
                            <p className="flex-[3] pt-2" style={{ lineHeight: '1.5' }}>
                                {content.overview}
                            </p>

                            <div className="flex-[2]">
                                <Credits contentDetails={content} credits={credits.data} />
                            </div>
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
