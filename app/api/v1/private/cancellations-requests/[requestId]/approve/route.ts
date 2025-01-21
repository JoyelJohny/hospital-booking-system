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

        if (isAlreadyApproved) console.log('oops')

        await Cancelled.findByIdAndUpdate(requestId, { status: "Approved" })
        const booking = await Cancelled.findById(requestId, 'bookingId')
        await Booking.findOneAndUpdate({ bookingId: booking.bookingId }, { status: 'Cancelled' })

        return NextResponse.json({ message: 'Approved cancellation successfully' }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.error()
    }

}