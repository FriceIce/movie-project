import { movieDetails, popularContent, topRatedMovies } from '@/assets/data';
import { actionComedyMovies } from '@/assets/data/movie/actionComedyMovies';
import { crimeTV } from '@/assets/data/tv/crimeTV';
import { trendingSeries } from '@/assets/data/tv/trendingTV';
import ContentSlider from '@/components/sliders/ContentSlider';
import TopTenContentSlider from '@/components/sliders/TopTenContentSlider';
import DesktopHeroImage from '@/features/home/containers/DesktopHeroImage';
import MobileHeroImageContainer from '@/features/home/containers/HeroImageContainer';

const Home = async () => {
    // const token = cookies().get('auth_token');

    return (
        <div className="flex flex-col">
            <MobileHeroImageContainer type="movie" contentDetails={movieDetails} />
            <DesktopHeroImage type="movie" contentDetails={movieDetails} />
            <section className="space-y-4 lg:space-y-10">
                <ContentSlider contentType="movie" title="Viral Movies" images={popularContent} />
                <ContentSlider contentType="tv" title="Fan Favorites" images={trendingSeries} />
                <TopTenContentSlider
                    contentType="movie"
                    title="Top Ten Highly Rated Movies"
                    content={topRatedMovies}
                />
                <ContentSlider
                    contentType="movie"
                    title="Action Comedies You’ll Love"
                    images={actionComedyMovies}
                />
                <ContentSlider contentType="tv" title="Crime Series" images={crimeTV} />
            </section>
        </div>
    );
};

export default Home;
