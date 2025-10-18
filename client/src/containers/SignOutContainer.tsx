'use client';

import { Auth } from '@/context/AuthContext';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/20/solid';
import Cookies from 'js-cookie';
import { useContext } from 'react';

function SignOutContainer() {
    const auth = useContext(Auth);
    function signOut() {
        auth?.setUser(null);
        Cookies.remove('auth_token');
        Cookies.remove('refreshToken');
        window.location.href = '/';
    }

    return (
        <>
            {
                <button onClick={() => signOut()} className={``}>
                    <ArrowLeftEndOnRectangleIcon className="size-6 md:size-7" />
                </button>
            }
        </>
    );
}

export default SignOutContainer;
