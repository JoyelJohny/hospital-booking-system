import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/booking"
import { connectDB } from "@/libs/dbConnection";

export async function POST(req: NextRequest) {
    const data = await req.json()
    const bookingId = "HBS1234"
    connectDB()
    const booked = await Booking.create({ bookingId: bookingId, ...data })
    return NextResponse.json(booked)
}