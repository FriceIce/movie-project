import ContentSlider from '@/components/sliders/ContentSlider';
import DesktopHeroImage from '@/features/home/containers/DesktopHeroImage';
import MobileHeroImageContainer from '@/features/home/containers/HeroImageContainer';
import { fetchJson } from '@/utils/fetchJson';
import getToken from '@/utils/getToken';

type Props = {
    params: {
        type: string;
        id: string;
    };
};

async function page({ params }: Props) {
    const { type, id } = params;
    const token = await getToken();

    // Retrieves all content
    const [page1, page2, page3, page4] = await Promise.all([
        fetchJson<FetchResponse<MovieItem<Movie[] | TvShow[]>>>(
            token,
            `/discovery/${1}/${type}?with_genres=${id}`
        ),
        fetchJson<FetchResponse<MovieItem<Movie[] | TvShow[]>>>(
            token,
            `/discovery/${2}/${type}?with_genres=${id}`
        ),
        fetchJson<FetchResponse<MovieItem<Movie[] | TvShow[]>>>(
            token,
            `/discovery/${3}/${type}?with_genres=${id}`
        ),
        fetchJson<FetchResponse<MovieItem<Movie[] | TvShow[]>>>(
            token,
            `/discovery/${4}/${type}?with_genres=${id}`
        ),
    ]);

    // Returns a poster for the hero picture on mobile screen.
    const posterPath = (
        arr: Movie[] | TvShow[]
    ): {
        poster_path: string;
        id: number;
        title: string;
        overview: string;
        backdropPath: string;
    } => {
        const item = arr.find((content) => content.poster_path && content.backdrop_path);
        return item && item.poster_path && item.backdrop_path
            ? {
                  poster_path: item.poster_path,
                  id: item.id,
                  backdropPath: item.backdrop_path,
                  overview: item.overview,
                  title: 'title' in item ? item.title : item.name,
              }
            : { poster_path: '', id: 0, backdropPath: '', overview: '', title: '' };
    };

    // This function creates each rows displayed on this page.
    function row<T>(arr: T[], size: number = 14): T[][] {
        const results: T[][] = [];

        for (let i = 0; i < arr.length; i += size) {
            results.push(arr.slice(i, i + size));
        }

        return results;
    }

    //
    const content = posterPath(page1.data.results);
    const allRows = [
        ...page1.data.results.filter((item) => content.id !== item.id),
        ...page2.data.results,
        ...page3.data.results,
        ...page4.data.results,
    ];
    const rows = row<Movie | TvShow>(allRows);

    return (
        <div>
            <MobileHeroImageContainer
                id={content.id}
                type={type as 'movie' | 'tv'}
                posterPath={content.poster_path}
            />
            <DesktopHeroImage
                id={content.id}
                type={type as 'movie' | 'tv'}
                title={content.title}
                backdropPath={content.backdropPath}
                overview={content.overview}
            />

            <section className="space-y-6 md:space-y-10">
                {rows.map((row, index) => {
                    return (
                        <li key={index} className="list-none">
                            <ContentSlider
                                label={`Slider for ${type === 'movie' ? 'movies' : 'TV shows'}`}
                                images={row}
                                contentType={type as 'movie' | 'tv'}
                            />
                        </li>
                    );
                })}
            </section>
        </div>
    );
}

export default page;
