import Header from '@/containers/Header';
import { poppins } from '@/assets/fonts';
import './globals.css';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased h-[2000px] w-dvw text-custom-white bg-custom-black ${poppins.className} overflow-x-hidden`}
            >
                <Header />
                <div className="relative  h-full">{children}</div>
            </body>
        </html>
    );
}
