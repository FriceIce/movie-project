/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                // Proxy, helps with cross-origin cookies
                source: '/api/:path*',
                destination: 'https://movie-project-ce202117d7e5.herokuapp.com/api/:path*',
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'themoviedb.org',
            },
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                port: '',
                pathname: '/t/p/**',
            },
        ],
    },
};

export default nextConfig;
