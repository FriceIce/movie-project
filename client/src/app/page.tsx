'use client';

import { icons } from '@/assets/icons';
import Image from 'next/image';

export default function SignIn() {
    // const [active, setActive] = useState<'email' | 'password' | null>(null);
    return (
        <div className="px-4 space-y-10 ">
            <div className="flex justify-center pt-[10%]">
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
                <form className="space-y-6 pt-6" onSubmit={(e) => e.preventDefault()}>
                    <section className="flex flex-col gap-2 rounded">
                        <label htmlFor="email" className={`text-sm`}>
                            Email
                        </label>
                        <input
                            id="email"
                            type="text"
                            className="bg-[#1c2432] h-[45px] text-sm outline-none px-2 placeholder-white rounded border"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') console.log('submitted');
                            }}
                        />
                    </section>
                    <section className="flex flex-col gap-2 rounded">
                        <label htmlFor="password" className={`text-sm`}>
                            Password
                        </label>
                        <input
                            id="password"
                            type="text"
                            className="bg-[#1c2432] h-[45px] text-sm outline-none px-2 placeholder-white rounded border"
                        />
                        <button type="button" className="text-neutral-300 text-sm self-start">
                            Forgot password?
                        </button>
                    </section>

                    <section>
                        <button
                            type="button"
                            className="bg-custom-cyanBlue font-bold p-2 h-[50px] w-full rounded"
                        >
                            Log in
                        </button>
                    </section>
                </form>
            </div>

            <div className="relative bg-neutral-200 h-[1px]">
                <p className="absolute bottom-1/2 translate-y-[50%] left-1/2 translate-x-[-50%] bg-custom-black p-1 text-xs">
                    OR
                </p>
            </div>

            <div
                role="button"
                className="flex justify-center items-center gap-2 bg-custom-white text-black font-bold p-2 h-[50px] w-full rounded"
            >
                <Image
                    src={icons.google.src}
                    alt={icons.google.alt}
                    height={icons.google.size}
                    width={icons.google.size}
                    className="flex-none size-6"
                />
                <span className="flex-none">Log in with Google</span>
            </div>
        </div>
    );
}
