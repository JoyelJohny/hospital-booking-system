import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Cancelled from "@/models/cancellation_request"
import Booking from "@/models/booking";
import { getTimings } from "@/libs/utils";
import { sendBookingCancellationMail } from "@/libs/mail";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ requestId: string }> }) {
    try {

        const requestId = (await params).requestId

        connectDB()

        const isRequestIdValid = await Cancelled.exists({ _id: requestId })
        if (!isRequestIdValid) return NextResponse.json({ message: "Cancellation request not found", messageType: 'error' }, { status: 404 })

        await Cancelled.findByIdAndUpdate(requestId, { status: "Approved" })
        const cancel = await Cancelled.findById(requestId, 'bookingId')
        await Booking.findOneAndUpdate({ bookingId: cancel.bookingId }, { status: 'Cancelled' })


        const booking = await Booking.findOne({ bookingId: cancel.bookingId }, 'patientName patientDOB patientEmail available.startTime available.endTime doctor.name treatment.name date')
        const bookInfo = {
            bookId: cancel.bookingId,
            treatment: booking.treatment.name,
            doctor: booking.doctor.name,
            date: booking.date,
            time: getTimings(booking.available.startTime, booking.available.endTime)
        }
        await sendBookingCancellationMail(booking.patientName, booking.patientEmail, bookInfo)


        return NextResponse.json({ message: 'Approved cancellation successfully', messageType: 'success' }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.error()
    }

}