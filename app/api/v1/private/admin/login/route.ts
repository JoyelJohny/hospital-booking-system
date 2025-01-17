import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Admin from "@/models/admin"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const JWT_SECRET = process.env.JWT_SECRET as string

if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined')

export async function POST(req: NextRequest) {
    connectDB()
    const headers = req.headers

    const { username, password } = await req.json()
    const user = await Admin.findOne({ username })

    if (!user) return NextResponse.json({ message: "user not available" })

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) return NextResponse.json({ message: "Incorrect password" })

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    console.log(token)

    return NextResponse.json({ message: "Login Successful", token })
}