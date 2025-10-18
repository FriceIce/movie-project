import { movieDetails, popularContent, topRatedMovies } from '@/assets/data';
import { actionComedyMovies } from '@/assets/data/movie/actionComedyMovies';
import { crimeTV } from '@/assets/data/tv/crimeTV';
import { trendingSeries } from '@/assets/data/tv/trendingTV';
import ContentSlider from '@/components/sliders/ContentSlider';
import TopTenContentSlider from '@/components/sliders/TopTenContentSlider';
import DesktopHeroImage from '@/features/home/containers/DesktopHeroImage';
import MobileHeroImageContainer from '@/features/home/containers/HeroImageContainer';
import getToken from '@/utils/getToken';
import { retrieveSavedContent } from '@/utils/saveDeleteRetrieveContent';

const Home = async () => {
    const token = await getToken();
    const savedContent = await retrieveSavedContent(token);

    return (
        <div className="flex flex-col">
            <MobileHeroImageContainer
                id={movieDetails.id}
                type="movie"
                title={movieDetails.title}
                posterPath={movieDetails.poster_path}
                backdropPath={movieDetails.backdrop_path}
                savedContent={savedContent?.data}
            />
            <DesktopHeroImage
                type="movie"
                id={movieDetails.id}
                title={movieDetails.title}
                overview={movieDetails.overview}
                companyLogo={movieDetails.production_companies}
                backdropPath={movieDetails.backdrop_path}
                savedContent={savedContent?.data}
                posterPath={movieDetails.poster_path}
            />
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
