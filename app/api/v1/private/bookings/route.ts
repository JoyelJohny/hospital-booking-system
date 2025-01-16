import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Booking from "@/models/booking"

export async function GET(req: NextRequest) {
    try {
        connectDB()
        const data = await Booking.find({ status: "Confirmed" })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: "Error" })
    }
}