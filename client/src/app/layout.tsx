import Header from '@/containers/Header';
import { jakarta } from '@/assets/fonts';
import './globals.css';
import SearchContext from '@/context/SearchContext';
import AuthContext from '@/context/AuthContext';
import SaveContentContext from '@/context/SaveContentContext';
import getUsername from '@/utils/fetchUser';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const username = await getUsername();

    return (
        <html lang="en">
            <body
                className={`antialiased w-dvw text-custom-white pb-2 bg-custom-black ${jakarta.className} overflow-x-hidden`}
            >
                <AuthContext>
                    <SaveContentContext>
                        <SearchContext>
                            <Header username={username}>
                                <div className="relative">{children}</div>
                            </Header>
                        </SearchContext>
                    </SaveContentContext>
                </AuthContext>
            </body>
        </html>
    );
}
