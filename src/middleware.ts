import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log('Middleware - Path:', pathname)

  // Get all cookies for debugging
  const allCookies = request.cookies.getAll()
  console.log('All cookies:', JSON.stringify(allCookies))

  // Get admin token
  const adminToken = request.cookies.get('admin_token')
  console.log('Admin Token:', adminToken ? 'Present' : 'Missing')

  // Public paths that don't require authentication
  const publicPaths = ['/admin/login']
  
  // If it's not an admin path, allow the request
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // If it's a public path, allow the request
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  // Check for admin token
  if (!adminToken) {
    console.log('Redirecting to login page - no admin token')
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Token exists, allow the request
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ],
} 