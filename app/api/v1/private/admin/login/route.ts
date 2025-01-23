import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Admin from "@/models/admin"
import { sign } from "@/libs/middlewareUtils"
import { verify } from '@/libs/middlewareUtils'
import bcrypt from 'bcrypt'


const JWT_SECRET = process.env.JWT_SECRET as string

if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined')


export async function POST(req: NextRequest) {
    try {
        connectDB()

        const { username, password } = await req.json()

        const user = await Admin.findOne({ username })

        if (!user) return NextResponse.json({ message: "Invalid username or password", messageType: 'error' }, { status: 401 })

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return NextResponse.json({ message: "Invalid username or password", messageType: 'error' }, { status: 401 })

        const token = await sign({ username })

        const response = NextResponse.json({ message: "Login Successful", token: 'LoggedIn', messageType: 'success' }, { status: 200 })

        response.cookies.set('token', `Bearer ${token}`, { httpOnly: true, maxAge: 60 * 60, secure: true })

        return response

    } catch (error) {

        console.error(error)

        return NextResponse.json({ message: 'Internal Server Error', messageType: 'error' }, { status: 500 })
    }


}

export async function GET(req: NextRequest) {
    const cookie = req.cookies.get('token')?.value
    const token = cookie && cookie.startsWith('Bearer') ? cookie.split(' ')[1] : null
    if (token) {
        const decoded = await verify(token)
        console.log(cookie, "\n", decoded)
        return NextResponse.json({ userLoggedIn: true })
    }
    return NextResponse.json({ userLoggedIn: false })
}