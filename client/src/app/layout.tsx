import Header from '@/containers/Header';
import { jakarta } from '@/assets/fonts';
import './globals.css';
import SearchContext from '@/context/SearchContext';
import AuthContext from '@/context/AuthContext';
import SaveContentContext from '@/context/SaveContentContext';
import getUsername from '@/utils/fetchUser';
import { MobileMenuOptions } from '@/containers/MobileMenuOptions';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const username = await getUsername();

    return (
        <html lang="en">
            <body
                className={`antialiased w-dvw h-dvh text-custom-white pb-2 bg-custom-black ${jakarta.className} overflow-x-hidden`}
            >
                <AuthContext>
                    <SaveContentContext>
                        <SearchContext>
                            <Header username={username}>
                                <div className="relative flex flex-col h-full">
                                    <div className="flex-1">{children}</div>
                                    <div className="sticky bottom-0 z-[20] mb-[-8px]">
                                        <MobileMenuOptions />
                                    </div>
                                </div>
                            </Header>
                        </SearchContext>
                    </SaveContentContext>
                </AuthContext>
            </body>
        </html>
    );
}
