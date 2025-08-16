'use client';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';

function ArrowLeft() {
    const router = useRouter();
    return (
        <button onClick={() => router.back()}>
            <ArrowLeftIcon title="Arrow left icon" className="size-6 ml-4"></ArrowLeftIcon>
        </button>
    );
}

export default ArrowLeft;
