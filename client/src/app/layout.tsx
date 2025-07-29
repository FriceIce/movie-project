import Header from '@/containers/Header';
import { jakarta } from '@/assets/fonts';
import './globals.css';

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
                <Header />
                <div className="relative h-full">{children}</div>
            </body>
        </html>
    );
}
