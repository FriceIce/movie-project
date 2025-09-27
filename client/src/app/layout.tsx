import Header from '@/containers/Header';
import { jakarta } from '@/assets/fonts';
import './globals.css';
import SearchContext from '@/context/SearchContext';
import AuthContext from '@/context/AuthContext';
import SaveContentContext from '@/context/SaveContentContext';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased w-dvw text-custom-white pb-2 bg-custom-black ${jakarta.className} overflow-x-hidden`}
            >
                <AuthContext>
                    <SaveContentContext>
                        <SearchContext>
                            <Header>
                                <div className="relative">{children}</div>
                            </Header>
                        </SearchContext>
                    </SaveContentContext>
                </AuthContext>
            </body>
        </html>
    );
}
