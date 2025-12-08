import { NextResponse } from 'next/server';

export const config = {
    matcher: ['/interno/:path*'],
};

export function middleware(req) {
    const cookies = req.cookies.get('token')?.value;

    if (!cookies) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}
