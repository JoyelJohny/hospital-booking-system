import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Admin from "@/models/admin"
import { sign } from "@/libs/utils"
import bcrypt from 'bcrypt'


const JWT_SECRET = process.env.JWT_SECRET as string

if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined')

export async function POST(req: NextRequest) {

    connectDB()

    const { username, password } = await req.json()

    const user = await Admin.findOne({ username })

    if (!user) return NextResponse.json({ message: "Invalid username or password" })

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) return NextResponse.json({ message: "Invalid username or password" })

    const token = await sign({ username })

    return NextResponse.json({ message: "Login Successful", token })
}