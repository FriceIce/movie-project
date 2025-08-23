import ContentSlider from '@/components/sliders/ContentSlider';
import TopTenContentSlider from '@/components/sliders/TopTenContentSlider';
import DesktopHeroImage from '@/features/home/containers/DesktopHeroImage';
import MobileHeroImageContainer from '@/features/home/containers/HeroImageContainer';

// json data
import action from '@/assets/data/tv/action.json';
import sportDocumentaries from '@/assets/data/tv/sportDocumentaries.json';
import strangerThings from '@/assets/data/tv/strangerThingsDetails.json';
import topRated from '@/assets/data/tv/topRated.json';
import trueCrime from '@/assets/data/tv/trueCrime.json';
import { fetchJson } from '@/utils/fetchJson';
import { sortByVote } from '@/utils/sortByVote';

const token = process.env.SERVER_TOKEN as string;

const page = async () => {
    const trendingPage2 = await fetchJson<FetchResponse<MovieItem<TvShow[]>>>(
        token,
        '/trending/tv'
    );

    return (
        <div className="flex flex-col">
            <MobileHeroImageContainer
                id={strangerThings.id}
                type="tv"
                posterPath={strangerThings.poster_path}
            />
            <DesktopHeroImage
                id={strangerThings.id}
                title={strangerThings.name}
                overview={strangerThings.overview}
                backdropPath={strangerThings.backdrop_path}
                type="tv"
            />
            <section className="space-y-4 lg:space-y-10">
                <ContentSlider
                    contentType="tv"
                    title="What Everyone’s Watching"
                    images={sortByVote(trendingPage2.data.results)}
                />
                <TopTenContentSlider
                    contentType="tv"
                    title="Critics’ Crown: Must-See Hits"
                    content={sortByVote(topRated.results)}
                />

                <ContentSlider
                    contentType="tv"
                    title="Sports Documentaries"
                    images={sortByVote(sportDocumentaries.results)}
                />
                <ContentSlider contentType="tv" title="Drama" images={sortByVote(action.results)} />
                <ContentSlider
                    contentType="tv"
                    title="True crime"
                    images={sortByVote(trueCrime.results)}
                />
            </section>
        </div>
    );
};

export default page;
