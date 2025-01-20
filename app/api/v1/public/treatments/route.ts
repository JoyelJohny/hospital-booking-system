import { connectDB } from "@/libs/dbConnection"
import { sendBookingConfirmationMail } from "@/libs/mail"
import Treatment from "@/models/treatments"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        connectDB()
        const data = await Treatment.find({}, '_id name');
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }


}