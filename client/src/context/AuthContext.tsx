'use client';

import { fetchJson } from '@/utils/fetchJson';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

export type AuthContextType = {
    user: UserData | null;
    setUser: Dispatch<SetStateAction<UserData | null>>;
    refreshToken: string;
    setRefreshToken: Dispatch<SetStateAction<string>>;
};

export const Auth = createContext<AuthContextType | null>(null);

type UserData = Pick<User, 'email' | 'username'>;

type Props = {
    children: ReactNode;
};

function AuthContext({ children }: Props) {
    const [user, setUser] = useState<UserData | null>(null);
    const [refreshToken, setRefreshToken] = useState<string>('');
    const pathname = usePathname();
    const oldAccessToken = Cookies.get('auth_token');
    const oldRefreshToken = Cookies.get('refreshToken');

    useEffect(() => {
        if (!oldAccessToken && oldRefreshToken) {
            const fetchRefresh = async () => {
                await fetchJson<FetchResponse<{ token: string }>>('', '/refresh', 'POST', {
                    oldRefreshToken,
                    checkDb: true,
                });
            };

            fetchRefresh();
        }

        // Retrieves user information if there is a valid access token.
        if (oldAccessToken) {
            const fetchUser = async () => {
                const user = await fetchJson<FetchResponse<UserData>>(oldAccessToken, `/me/`);
                setUser(user.data);
            };

            fetchUser();
        }
    }, [pathname, oldAccessToken, oldRefreshToken]);

    return (
        <Auth.Provider value={{ user, setUser, refreshToken, setRefreshToken }}>
            {children}
        </Auth.Provider>
    );
}

export default AuthContext;
