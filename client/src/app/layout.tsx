import Header from '@/containers/Header';
import './globals.css';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased h-[2000px] w-dvw text-custom-white bg-custom-black`}>
                <Header />
                <div className="relative px-4 h-full">{children}</div>
            </body>
        </html>
    );
}
