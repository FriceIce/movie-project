import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    console.log('Running middleware...');
    const accessToken = req.cookies.get('auth_token')?.value;
    const refreshToken = req.cookies.get('refreshToken')?.value;
    const routePath = req.nextUrl.pathname === '/';

    // Sends the user to sign in page if there is no valid tokens and the path is not on `/`
    if (!accessToken && !refreshToken && !routePath)
        return NextResponse.redirect(new URL('/', req.url));

    // Sends the user to `/home` page if the token is valid and the path is `/`
    if ((accessToken && routePath) || (refreshToken && routePath))
        return NextResponse.redirect(new URL('/home', req.url));

    // Proceeds to page
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/movies', '/home', '/content/:path*', '/tv'],
};
