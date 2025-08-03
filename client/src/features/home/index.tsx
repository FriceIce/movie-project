import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import { cookies } from 'next/headers';

const Container = async () => {
    const token = cookies().get('auth_token');
    const img = 'https://image.tmdb.org/t/p/w500/bUeiwBQdupBLQthMCHKV7zv56uv.jpg';
    const response = await axios.get<MovieItem<Movie[]>>(
        'http://localhost:3001/api/popular/1/movie',
        {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + String(token?.value),
            },
        }
    );

    console.log(response.data.results);
    return (
        <div className="space-y-6">
            <div className=" space-y-6 px-4">
                <section className="relative flex items-end w-[95%] mx-auto border border-white rounded-lg h-[500px] md:hidden">
                    <Image
                        src={img}
                        alt="movie poster"
                        width={500}
                        height={500}
                        priority
                        className="absolute inset-0 h-full w-full object-cover object-top rounded-lg z-[-1]"
                    />
                    <div className="flex gap-4 w-full p-4 font-bold">
                        <button
                            type="button"
                            className="flex-1 text-custom-black bg-white rounded px-4 py-1 shadow-md"
                        >
                            See details
                        </button>
                        <button
                            type="button"
                            className="flex-1 rounded px-4 py-2 bg-custom-cyanBlue shadow-md"
                        >
                            My list
                        </button>
                    </div>
                </section>
            </div>
            <section className="">
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

export default Container;
