import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from '@/libs/middlewareUtils'

const api_url = process.env.PUBLIC_NEXT_API_URI

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const cookies = req.cookies.get('token')?.value
    const token = cookies && cookies.startsWith('Bearer') ? cookies.split(' ')[1] : null

    try {
        if (!token) {
            if (path.startsWith('/admin')) {
                return NextResponse.redirect(new URL(`${api_url}/`))
            } else {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
            }
        }
        await verify(token)

        return NextResponse.next()

    } catch (error) {
        console.error(error);
        if (path.startsWith('/admin')) {
            return NextResponse.redirect(new URL(`${api_url}/`))
        }
        return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 })
    }

}

export const config = {
    matcher: ['/api/v1/private/bookings/:path*', '/api/v1/private/treatments/:path*', '/api/v1/private/cancellations-requests/:path*', '/api/v1/private/doctors/:path*', '/admin/cancellations', '/admin/bookings', '/admin/treatments', '/admin/doctors']


}