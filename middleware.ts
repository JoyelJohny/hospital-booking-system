import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from '@/libs/middlewareUtils'

const JWT_SECRET = process.env.JWT_SECRET as string

const api_url = process.env.PUBLIC_NEXT_API_URI || 'http://localhost:3000'

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl
    const cookies = req.cookies.get('token')?.value
    const token = cookies && cookies.startsWith('Bearer') ? cookies.split(' ')[1] : 'null'
    console.log(token)
    if (token == "null" || token == null) {

        // return NextResponse.redirect(new URL(`${api_url}/admin`))

        const response = NextResponse.json({ message: 'Unauthorized' }, { status: 302 })
        response.headers.set('Location', `${api_url}/admin`)
        return response

        // return NextResponse.json({ error: "Authorization revoked" }, { status: 401 })
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
    matcher: ['/api/v1/private/bookings/:path*', '/api/v1/private/treatments/:path*', '/api/v1/private/cancellations-requests/:path*', '/api/v1/private/doctors/:path*', '/admin/cancellations']


}