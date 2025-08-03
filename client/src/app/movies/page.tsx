import ContentSlider from '@/components/sliders/ContentSlider';
import TopTenContentSlider from '@/components/sliders/TopTenContentSlider';
import DesktopHeroImage from '@/features/home/containers/DesktopHeroImage';
import MobileHeroImageContainer from '@/features/home/containers/HeroImageContainer';
import { sortByVote } from '@/utils/sortByVote';

// movies json
import ad from '@/assets/data/movie/actionAdventure.json';
import animeMovies from '@/assets/data/movie/anime.json';
import happyGilmore2 from '@/assets/data/movie/HappyGilmore2.json';
import horrorMovies from '@/assets/data/movie/horror.json';
import nowPlaying from '@/assets/data/movie/nowPlaying.json';
import trendingMovies from '@/assets/data/movie/trending.json';

const Movies = () => {
    const currentlyPlaying = sortByVote(nowPlaying.results);
    const trending = sortByVote(trendingMovies.results);
    const horror = sortByVote(horrorMovies.results);
    const actionAdventures = sortByVote(ad.results);
    const anime = sortByVote(animeMovies.results);

    return (
        <div className="flex flex-col">
            <MobileHeroImageContainer type="movie" contentDetails={happyGilmore2} />
            <DesktopHeroImage type="movie" contentDetails={happyGilmore2} />
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
