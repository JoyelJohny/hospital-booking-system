import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from '@/libs/utils'

const JWT_SECRET = process.env.JWT_SECRET as string

export default async function middleware(req: NextRequest) {
    const authHeader = req.headers.get('auth')

    const token = authHeader && authHeader.startsWith('Bearer') ? authHeader.split(' ')[1] : 'null'
    console.log(authHeader)
    if (token == "null" || null) {
        return NextResponse.json({ error: "Authorization revoked" }, { status: 401 })
    }
    if (token != null || token != 'null') {
        try {

            // Verify the token
            const decoded = await verify(token)
            console.log(decoded)

            return NextResponse.next(); // Proceed to the requested route

        } catch (error) {

            console.error('JWT verification failed:', error);
            // Redirect to login if token verification fails
            return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 })
        }
    }
}

export const config = {
    matcher: ['/api/v1/private/bookings/:path*', '/api/v1/private/treatments/:path*', '/api/v1/private/cancellations-requests/:path*', '/api/v1/private/doctors/:path*']

    //'/admin/bookings/:path*', '/admin/treatments/:path*', '/admin/doctors/:path*', '/admin/cancellations/:path*'
}