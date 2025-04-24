'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Button = () => {
    const router = useRouter();

    async function handleClick() {
        const response = await fetch('http://localhost:3001/api/guestLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data: { message: string; token: string } = await response.json();

        await fetch('/api/set-cookie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: data.token }),
        });
        router.push('/home');
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className="px-2 py-1 rounded bg-slate-400 text-white cursor-pointer "
        >
            To Home Page
        </button>
    );
};

export default Button;
