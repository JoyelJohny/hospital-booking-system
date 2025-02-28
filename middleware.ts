import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
export { default } from 'next-auth/middleware'

// const api_url = process.env.PUBLIC_NEXT_API_URI

export async function middleware(req: NextRequest) {
    const token = await getToken({ req: req, secret: process.env.JWT_SECRET })
    const url = req.nextUrl
    if (!token &&
        (
            url.pathname.startsWith('/admin/dashboard') ||
            url.pathname.startsWith('/admin/doctors') ||
            url.pathname.startsWith('/admin/treatments') ||
            url.pathname.startsWith('/admin/bookings') ||
            url.pathname.startsWith('/admin/cancellations')
        )
    ) {
        return NextResponse.redirect(new URL('/admin', req.url))
    }
    if (token &&
        (
            url.pathname.startsWith('/admin')
        )
    ) {
        return NextResponse.next()
    }

    return NextResponse.next()
    // const path = req.nextUrl.pathname
    // const cookies = req.cookies.get('token')?.value
    // const token = cookies && cookies.startsWith('Bearer') ? cookies.split(' ')[1] : null
    // return NextResponse.next()
    // try {
    //     if (!token) {
    //         if (path.startsWith('/admin')) {
    //             return NextResponse.redirect(new URL(`${api_url}`))
    //         } else {
    //             return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    //         }
    //     }
    //     await verify(token)

    //     return NextResponse.next()

    // } catch (error) {
    //     console.error(error);
    //     if (path.startsWith('/admin')) {
    //         return NextResponse.redirect(new URL(`${api_url}/`))
    //     }
    //     return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 })
    // }

}

export const config = {
    matcher: ['/admin/:path*', '/admin']
    // matcher: ['/api/v1/private/bookings/:path*', '/api/v1/private/treatments/:path*', '/api/v1/private/cancellations-requests/:path*', '/api/v1/private/doctors/:path*', '/admin/cancellations', '/admin/bookings', '/admin/treatments', '/admin/doctors']


}