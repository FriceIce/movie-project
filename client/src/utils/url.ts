export function url() {
    return process.env.NODE_ENV === 'production'
        ? 'https://tmdb-movie-project.vercel.app'
        : 'http://localhost:3001';
}
