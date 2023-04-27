import { NextResponse } from 'next/server';
import { authRoutes, protectedRoutes } from 'src/router';

export function middleware(request) {
  const user = request.cookies.get('user');

  if (protectedRoutes.includes(request.nextUrl.pathname) && !user) {
    request.cookies.delete('user');
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.delete('user');

    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (request.nextUrl.pathname === '/') {
    if (user) return NextResponse.redirect(new URL('/dashboard', request.url));

    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}
