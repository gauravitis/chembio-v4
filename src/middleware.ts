import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === '/' || 
    path === '/products' || 
    path === '/special-offers' || 
    path.startsWith('/products/') ||
    path.startsWith('/api/products')

  // Check if the path is an admin route
  const isAdminPath = path.startsWith('/admin')

  // Get the admin token from cookies
  const adminToken = request.cookies.get('admin_token')?.value

  // If it's an admin path and there's no admin token, redirect to login
  if (isAdminPath && !adminToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // If it's a public path, allow access
  if (isPublicPath) {
    return NextResponse.next()
  }

  // For all other paths, require authentication
  if (!adminToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
} 