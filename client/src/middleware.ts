import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    console.log('Running middleware...');
    const token = req.cookies.get('auth_token')?.value;
    const routePath = req.nextUrl.pathname === '/';

    if (!token) NextResponse.redirect(new URL('/', req.url));
    if (token && routePath) {
        return NextResponse.redirect(new URL('/home', req.url));
    }

    // Proceeds to page
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/movie', '/home', '/content/:id', '/tv'],
};
