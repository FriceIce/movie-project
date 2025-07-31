import { movieDetails, popularContent, topRatedMovies } from '@/assets/mockData';
import { actionComedyMovies } from '@/assets/mockData/actionComedyMovies';
import { crimeTV } from '@/assets/mockData/crimeTV';
import { trendingSeries } from '@/assets/mockData/trendingTV';
import ContentSlider from '@/components/sliders/ContentSlider';
import TopTenContentSlider from '@/components/sliders/TopTenContentSlider';
import DesktopHeroImage from '@/features/home/containers/DesktopHeroImage';
import MobileHeroImageContainer from '@/features/home/containers/HeroImageContainer';

const Home = async () => {
    // const token = cookies().get('auth_token');
    const img = 'https://image.tmdb.org/t/p/w500' + movieDetails.poster_path; // id: 533535
    const desktopImg = 'https://image.tmdb.org/t/p/original' + movieDetails.backdrop_path;

    return (
        <div className="flex flex-col">
            <MobileHeroImageContainer img={img} id={533535} />
            <DesktopHeroImage img={desktopImg} id={533535} />
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
