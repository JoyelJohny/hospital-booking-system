import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Cancelled from "@/models/cancellation_request"
import Booking from "@/models/booking";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ requestId: string }> }) {
    try {

        const requestId = (await params).requestId

        connectDB()

        const isRequestIdValid = await Cancelled.exists({ _id: requestId })
        if (!isRequestIdValid) return NextResponse.json({ error: "Cancellation request not found" }, { status: 404 })

        const isAlreadyApproved = await Cancelled.findOne({ _id: requestId, status: 'Approved' })
        if (isAlreadyApproved) return NextResponse.json({ error: 'Cancellation request already processed' }, { status: 400 })

        const data = await Cancelled.findByIdAndUpdate(requestId, { status: "Approved" })
        const bookingId = await Cancelled.findById(requestId, 'bookingId')
        const updateBookingInfo = await Booking.findOneAndUpdate({ bookingId: bookingId }, { status: 'Cancelled' })

        return NextResponse.json({ message: 'Approved cancellation successfully' }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.error()
    }

}