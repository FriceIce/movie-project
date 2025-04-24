import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('auth_token')?.value;
    const routePath = req.nextUrl.pathname === '/';

    if (!token) redirect('/');
    if (token && routePath) {
        return NextResponse.redirect(new URL('/home', req.url));
    }

    // Proceeds to page
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/movie', '/home', '/content/:id', '/tv'],
};
