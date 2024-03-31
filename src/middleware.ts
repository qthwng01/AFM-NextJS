import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const authRoutes = ['/login']

export async function middleware(req: NextRequest) {
  const session = req.cookies.get('_ui_session')

  // If there is a session and the user is trying to access /login, redirect to /
  if ((session && req.nextUrl.pathname.includes('/login')) || req.nextUrl.pathname.startsWith('/signup')) {
    const absoluteURL = new URL('/', req.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }

  //Return to /login if don't have a session
  if (!session && !authRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(req.nextUrl.pathname)}`, req.url))
  }

  //Return to /login if token is not authorized
  if (!authRoutes.includes(req.nextUrl.pathname)) {
    try {
      const responseAPI = await fetch(`${req.nextUrl.origin}/api/login`, {
        headers: {
          Cookie: `_ui_session=${session?.value}`,
        },
      })
      if (responseAPI.status !== 200) {
        return NextResponse.redirect(new URL('/login', req.url))
      }
    } catch (e) {
      console.log(e)
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/infomation/:path*', '/checkout'],
}
