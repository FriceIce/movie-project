import Link from 'next/link';
import React from 'react';

type Prop = {
    id: number;
};

function ContentActionBtns({ id }: Prop) {
    return (
        <>
            <Link href={'content/' + id}>
                <button
                    type="button"
                    className="text-custom-black text-xs md:text-sm 2xl:text-base px-6 py-2 lg:px-6 lg:py-[8px] 2xl:py-[11px] bg-white rounded-[2px] shadow-md"
                >
                    See Details
                </button>
            </Link>
            <button
                type="button"
                className="px-6 py-2 lg:px-6 lg:py-[8px] 2xl:py-[11px] rounded-[2px] bg-custom-cyanBlue text-xs md:text-sm 2xl:text-base shadow-md"
            >
                Add To List
            </button>
        </>
    );
}

export default ContentActionBtns;
