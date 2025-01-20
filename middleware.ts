import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from '@/libs/middlewareUtils'

const JWT_SECRET = process.env.JWT_SECRET as string

export default async function middleware(req: NextRequest) {
    const authHeader = req.headers.get('auth')

    const token = authHeader && authHeader.startsWith('Bearer') ? authHeader.split(' ')[1] : 'null'

    if (token == "null" || null) {
        return NextResponse.json({ error: "Authorization revoked" }, { status: 401 })
    }
    if (token != null || token != 'null') {
        try {


            const decoded = await verify(token)

            return NextResponse.next();

        } catch (error) {

            console.error(error);

            return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 })
        }
    }
}

export const config = {
    matcher: ['/api/v1/private/bookings/:path*', '/api/v1/private/treatments/:path*', '/api/v1/private/cancellations-requests/:path*', '/api/v1/private/doctors/:path*']

    //'/admin/bookings/:path*', '/admin/treatments/:path*', '/admin/doctors/:path*', '/admin/cancellations/:path*'
}