import Header from '@/containers/Header';
import { jakarta } from '@/assets/fonts';
import './globals.css';
import SearchContext from '@/context/SearchContext';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased w-dvw text-custom-white pb-6 bg-custom-black ${jakarta.className} overflow-x-hidden`}
            >
                <SearchContext>
                    <Header>
                        <div className="relative h-full">{children}</div>
                    </Header>
                </SearchContext>
            </body>
        </html>
    );
}
