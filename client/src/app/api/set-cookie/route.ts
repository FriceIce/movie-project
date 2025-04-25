import { NextResponse } from 'next/server';

/**
 * This route stores the auth token in cookies.
 *
 * @param {Request} req
 * @returns {NextResponse}
 */
export async function POST(req: Request) {
    const body: { token: string } = await req.json();
    const token = body.token;

    const response = NextResponse.json({
        success: true,
    });

    response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 3600000, // 1 hour
    });

    return response;
}
