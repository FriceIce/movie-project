/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'themoviedb.org',
            },
        ],
    },
};

export default nextConfig;
