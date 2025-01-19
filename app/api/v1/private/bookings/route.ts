import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Booking from "@/models/booking"

export async function GET(req: NextRequest) {
    try {
        connectDB()
        const bookings = await Booking.find({ status: "Confirmed" })
        bookings.forEach((booking) => (booking.doctor.name = `Dr ${booking.doctor.name}`))
        return NextResponse.json(bookings)
    } catch (error) {
        return NextResponse.json({ error: "Error" })
    }
}