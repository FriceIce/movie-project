'use client';

import { icons } from '@/assets/icons';
import Spinner from '@/components/spinners/Spinner';
import { Auth } from '@/context/AuthContext';
import { fetchJson } from '@/utils/fetchJson';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    email: string;
    password: string;
};

export default function SignIn() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const userContext = useContext(Auth);

    const { register, handleSubmit } = useForm<Inputs>();
    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        // Disables the `Log in` button.
        setIsDisabled(true);

        // Checks if the user credential is valid
        const response = await fetchJson<FetchResponse<User>>('', '/login', 'POST', data);

        //Implements the user info and refresh token
        userContext?.setUser(response.data);
        userContext?.setRefreshToken(response.data.refreshToken);

        //Redirect to /home page.
        if (response) {
            setTimeout(() => router.replace('/home'), 300);
        }
    };

    // Instead of writing two nearly identical image components within the JSX code.
    const showPasswordImage = (src: string) => (
        <Image
            src={src}
            height={20}
            width={20}
            alt="Show password icon"
            className="size-5 object-contain"
        />
    );
    return (
        <div className={`gap-4 py-16 px-4 md:px-0`}>
            <div className="hidden md:block absolute inset-0 z-[-1] w-full mask-image-mobile-poster">
                <div className="absolute inset-0 size-full bg-[#00000059]" />
                <Image
                    src={'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg'}
                    alt="Login poster"
                    height={0}
                    width={1280}
                    className={`h-full w-full object-cover object-center `}
                />
            </div>
            <div className="flex-1 space-y-7 max-w-[650px] mx-auto">
                <div className="flex justify-center pt-[0%]">
                    <Image
                        src={icons.logo.square}
                        alt={icons.logo.alt}
                        height={500}
                        width={500}
                        priority
                        className={`size-[100px] object-contain object-center`}
                    />
                </div>
                <div className="">
                    <h1 className="text-3xl font-semibold">User login</h1>
                    <form
                        className="space-y-6 pt-6"
                        method="POST"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <section className="flex flex-col gap-2 rounded">
                            <label htmlFor="email" className={`text-sm`}>
                                Email
                            </label>
                            <input
                                id="email"
                                type="text"
                                value={'fabian.jackson@gmail.com'}
                                {...register('email')}
                                className="bg-[#1c2432] h-[45px] text-sm outline-none px-2 placeholder-white rounded border"
                            />
                        </section>
                        <section className="flex flex-col gap-2 rounded">
                            <label htmlFor="password" className={`text-sm`}>
                                Password
                            </label>
                            <div className="bg-[#1c2432] w-full flex items-center border rounded">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={process.env.USER_PASSWORD}
                                    {...register('password')}
                                    className="bg-transparent h-[45px] flex-1 text-sm outline-none px-2 placeholder-white"
                                />
                                <div
                                    role="button"
                                    className="px-4"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPasswordImage(
                                        showPassword ? '/show-password.svg' : '/hide-password.svg'
                                    )}
                                </div>
                            </div>
                            <button type="button" className="text-neutral-300 text-sm self-start">
                                Forgot password?
                            </button>
                        </section>
                        <section className="">
                            <button
                                type="submit"
                                disabled={isDisabled}
                                onClick={() => setIsLoading(true)}
                                className="flex justify-center items-center gap-4 bg-custom-cyanBlue font-bold p-2 h-[50px] w-full rounded"
                            >
                                {isLoading && <Spinner />}
                                {isLoading ? 'Please wait' : 'Log in'}
                            </button>
                        </section>
                    </form>
                </div>
            </div>
        </div>
    );
}
