import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Booking from "@/models/booking"

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ bookingId: string }> }) {
    const bookingId = (await params).bookingId
    connectDB()
    const updatedBooking = await Booking.findOneAndUpdate({ bookingId: bookingId }, { status: "cancelled", cancelledAt: Date.now() }, { new: true })
    return NextResponse.json({ message: "Booking cancelled successfully", updatedBooking })

}