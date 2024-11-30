import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const LOGIN_PATH = '/auth/login';
export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    const allowedPaths = ['/', '/auth/login', '/auth/register'];
    const currentPath = request.nextUrl.pathname;

    if (allowedPaths.includes(currentPath)) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    }

    try {
        const { payload } = await jwtVerify(token.value, new TextEncoder().encode(process.env.JWT_SECRET));
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user-id', payload.userId as string);
        requestHeaders.set('x-pathname', request.nextUrl.pathname);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch {
        return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
        '/dashboard/:path*',
        '/profile/:path*'
    ],
};