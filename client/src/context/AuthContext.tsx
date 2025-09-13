'use client';

import { fetchJson } from '@/utils/fetchJson';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

type AuthContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    refreshToken: string;
    setRefreshToken: Dispatch<SetStateAction<string>>;
};

export const Auth = createContext<AuthContextType | null>(null);

type Props = {
    children: ReactNode;
};

function AuthContext({ children }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [refreshToken, setRefreshToken] = useState<string>('');
    const pathname = usePathname();

    useEffect(() => {
        const oldAccessToken = Cookies.get('auth_token');
        const oldRefreshToken = Cookies.get('refreshToken');

        if (!oldAccessToken && oldRefreshToken) {
            const fetchRefresh = async () => {
                const tokenResponse = await fetchJson<FetchResponse<{ token: string }>>(
                    '',
                    '/refresh',
                    'POST',
                    { oldRefreshToken, checkDb: true }
                );
            };

            fetchRefresh();
        }
    }, [pathname]);

    return (
        <Auth.Provider value={{ user, setUser, refreshToken, setRefreshToken }}>
            {children}
        </Auth.Provider>
    );
}

export default AuthContext;
