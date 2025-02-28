import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Admin from "@/models/admin"
import bcrypt from 'bcrypt'

type user = {
    _id: string,
    email: string,
    username: string,
    password: string
}

export async function POST(req: NextRequest) {
    try {
        const { username, email, password } = await req.json();

        if (!email || !password || !username) {
            return NextResponse.json({ error: "Email, username and password are required", messageType: 'error' }, { status: 400 });
        }

        const existingUser = await Admin.findOne({ email: email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists with this email", messageType: 'error' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 3);
        const newAdmin = await Admin.create({ username: username, email: email, password: hashedPassword })

        return NextResponse.json({ message: "Account created successfully! Please log in to continue.", messageType: 'success' }, { status: 201 });
    } catch (error: any) {
        throw new Error(error)

    }


}
