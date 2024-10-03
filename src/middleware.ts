import { NextResponse, type NextRequest } from 'next/server'

const AUTH_ROUTES = ['/login', '/callback']

export default function middleware(request: NextRequest) {
  if (AUTH_ROUTES.includes(request.nextUrl.pathname) && request.cookies.has('access_token')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!AUTH_ROUTES.includes(request.nextUrl.pathname) && !request.cookies.has('access_token')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
