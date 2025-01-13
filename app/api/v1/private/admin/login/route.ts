import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Admin from "@/models/admin"

export async function POST(req: NextRequest) {
    const { username, password } = await req.json()
    return NextResponse.json({ username, password })
}