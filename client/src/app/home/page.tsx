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
    const img = 'https://image.tmdb.org/t/p/w500' + movieDetails.poster_path; // id: 448150
    const desktopImg = 'https://image.tmdb.org/t/p/original' + movieDetails.backdrop_path;

    // const response = await axios.get<MovieItem<Movie>>(
    //     'http://localhost:3001/api/popular/1/movie',
    //     {
    //         headers: {
    //             accept: 'application/json',
    //             Authorization: 'Bearer ' + String(token?.value),
    //         },
    //     }
    // );

    return (
        <div className="flex flex-col">
            <MobileHeroImageContainer img={img} />
            <DesktopHeroImage img={desktopImg} />
            <section className="space-y-4 lg:space-y-10">
                <ContentSlider title="Viral Movies" images={popularContent} />
                <ContentSlider title="Fan Favorites" images={trendingSeries} />
                <TopTenContentSlider title="Top Ten Highly Rated Movies" content={topRatedMovies} />
                <ContentSlider title="Action Comedies You’ll Love" images={actionComedyMovies} />
                <ContentSlider title="Crime Series" images={crimeTV} />
            </section>
        </div>
    );
};

export default Home;
