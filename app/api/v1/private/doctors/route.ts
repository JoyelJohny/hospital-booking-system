import mongoose from "mongoose"
import Doctor from "@/app/models/doctor";
import { NextRequest, NextResponse } from "next/server"

const dbURI: string = process.env.MONGODB_URI || "hello";

mongoose.connect(dbURI, { dbName: "hospital-booking-system" })
mongoose.connection.on('connected', () => {
    console.log("connected db successfully")
})

let users = {
    "name": "arun",
    age: 23
}

export async function GET() {
    return NextResponse.json(users)
}

export async function POST(req: Request) {
    const data = await req.json();
    Doctor.create(data)
    return NextResponse.json(data)
}