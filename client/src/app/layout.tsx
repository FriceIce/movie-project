import { jakarta } from '@/assets/fonts';
import Header from '@/containers/Header';
import { MobileMenuOptions } from '@/containers/MobileMenuOptions';
import AuthContext from '@/context/AuthContext';
import SaveContentContext from '@/context/SaveContentContext';
import SearchContext from '@/context/SearchContext';
import getUserInfo from '@/utils/fetchUser';
import './globals.css';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getUserInfo();

    return (
        <html lang="en">
            <body
                className={`antialiased flex flex-col w-dvw min-h-dvh text-custom-white pb-2 bg-custom-black ${jakarta.className} overflow-x-hidden`}
            >
                <AuthContext>
                    <SaveContentContext>
                        <SearchContext>
                            <Header username={user?.username}>
                                <div className="relative flex-1 flex flex-col">
                                    <div className="flex-1">{children}</div>
                                    <footer className="sticky bottom-0 z-[20] mb-[-8px]">
                                        <MobileMenuOptions />
                                    </footer>
                                </div>
                            </Header>
                        </SearchContext>
                    </SaveContentContext>
                </AuthContext>
            </body>
        </html>
    );
}
