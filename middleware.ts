import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default function middleware(req: NextRequest) {
    const authHeader = req.headers.get('auth')
    const path = req.nextUrl

    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    if (token == "null") {
        return NextResponse.redirect(new URL('/admin', req.nextUrl))
    }
    console.log("hello")
    return NextResponse.next()
}

export const config = {
    matcher: ['/api/v1/private/bookings/:path*', '/api/v1/private/treatments/:path*', '/api/v1/private/cancellations-requests/:path*', '/api/v1/private/doctors/:path*', '/admin/bookings:path*', '/admin/treatments:path*', '/admin/doctors:path*', '/admin/cancellations:path*',]
}