import HeroImageContainer from '@/features/home/containers/HeroImageContainer';
import axios from 'axios';
import { cookies } from 'next/headers';
import Image from 'next/image';

const Home = async () => {
    const token = cookies().get('auth_token');
    const img = 'https://image.tmdb.org/t/p/w500/bUeiwBQdupBLQthMCHKV7zv56uv.jpg';
    const response = await axios.get<MovieItem<Movie>>(
        'http://localhost:3001/api/popular/1/movie',
        {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + String(token?.value),
            },
        }
    );

    return (
        <div className="space-y-6 flex flex-col">
            <HeroImageContainer img={img} />
            <section>
                <div className="space-y-2">
                    <h2 className="ml-4 font-bold text-base">Popular</h2>
                    <ul className="flex overflow-x-auto no-scrollbar">
                        {response.data.results.map((content, index, self) => {
                            const lastCard = index === self.length - 1;
                            if (!content.poster_path) return;
                            return (
                                <li
                                    key={content.id}
                                    className={`flex-none h-[170px] w-[130px] border rounded ml-4 ${
                                        lastCard && 'mr-4'
                                    }`}
                                >
                                    <Image
                                        src={content.poster_path}
                                        alt={content.original_title + 'poster'}
                                        width={500}
                                        height={500}
                                        className="size-full rounded"
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default Home;
