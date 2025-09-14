'use client';

import Cookies from 'js-cookie';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/20/solid';

type Props = {
    displaySignoutOption: boolean;
};

function SignOutContainer({ displaySignoutOption }: Props) {
    function signOut() {
        Cookies.remove('auth_token');
        Cookies.remove('refreshToken');
        window.location.href = '/';
    }

    return (
        <>
            {displaySignoutOption && (
                <div
                    className={`absolute bottom-[-40px] right-[-10px] md:right-[0px] md:bottom-[-17px] bg-custom-cyanBlue text-white px-[8px] py-[4px] h-max w-max text-center rounded-[2px] transition-all duration-200`}
                >
                    <button className="flex gap-1 text-sm" onClick={() => signOut()}>
                        Sign out
                        <ArrowLeftEndOnRectangleIcon className="size-6" />
                    </button>
                </div>
            )}
        </>
    );
}

export default SignOutContainer;
