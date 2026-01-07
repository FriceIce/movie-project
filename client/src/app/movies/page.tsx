import ContentSlider from '@/components/sliders/ContentSlider';
import TopTenContentSlider from '@/components/sliders/TopTenContentSlider';
import DesktopHeroImage from '@/features/home/containers/DesktopHeroImage';
import MobileHeroImageContainer from '@/features/home/containers/HeroImageContainer';
import { sortByVote } from '@/utils/sortByVote';

// movies json
import ad from '@/assets/data/movie/actionAdventure.json';
import animeMovies from '@/assets/data/movie/anime.json';
import happyGilmore2 from '@/assets/data/movie/happyGilmore2.json';
import horrorMovies from '@/assets/data/movie/horror.json';
import nowPlaying from '@/assets/data/movie/nowPlaying.json';
import trendingMovies from '@/assets/data/movie/trending.json';
import getToken from '@/utils/getToken';
import { retrieveSavedContent } from '@/utils/saveDeleteRetrieveContent';

const Movies = async () => {
    const token = await getToken();
    const savedContent = await retrieveSavedContent(token);
    const currentlyPlaying = sortByVote(nowPlaying.results);
    const trending = sortByVote(trendingMovies.results);
    const horror = sortByVote(horrorMovies.results);
    const actionAdventures = sortByVote(ad.results);
    const anime = sortByVote(animeMovies.results);

    return (
        <div className="flex flex-col">
            <MobileHeroImageContainer
                title={happyGilmore2.title}
                id={happyGilmore2.id}
                type="movie"
                posterPath={happyGilmore2.poster_path}
                backdropPath={happyGilmore2.backdrop_path}
                savedContent={savedContent?.data}
            />
            <DesktopHeroImage
                id={happyGilmore2.id}
                type="movie"
                title={happyGilmore2.title}
                overview={happyGilmore2.overview}
                backdropPath={happyGilmore2.backdrop_path}
                savedContent={savedContent?.data}
                posterPath={happyGilmore2.poster_path}
            />
            <section className="space-y-4 lg:space-y-10">
                <ContentSlider
                    contentType="movie"
                    title="Fresh from the Big Screen"
                    images={currentlyPlaying}
                />
                <TopTenContentSlider
                    contentType="movie"
                    title="Trending This Week"
                    content={trending}
                />

                <ContentSlider contentType="movie" title="Nightmares & Thrills" images={horror} />
                <ContentSlider
                    contentType="movie"
                    title="High-Octane Adventures"
                    images={actionAdventures}
                />
                <ContentSlider contentType="movie" title="Epic Anime Worlds" images={anime} />
            </section>
        </div>
    );
};

export default Movies;
