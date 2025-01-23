import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Booking from "@/models/booking"

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ bookingId: string }> }) {
    try {
        const bookingId = (await params).bookingId
        connectDB()
        const updatedBooking = await Booking.findOneAndUpdate({ bookingId: bookingId }, { status: "Cancelled", cancelledAt: Date.now() }, { new: true })
        console.log(updatedBooking)
        return NextResponse.json({ message: "Booking cancelled successfully", messageType: 'success', updatedBooking })
    } catch (error) {
        console.error(error)
        return NextResponse.error()
    }


}