export function url() {
    return process.env.NODE_ENV === 'production'
        ? process.env.SERVER_URL!
        : 'http://localhost:3001';
}
