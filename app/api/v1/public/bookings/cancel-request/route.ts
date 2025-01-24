import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Cancelled from "@/models/cancellation_request"
import Booking from "@/models/booking";
import { sendCancellationRequestMail } from "@/libs/mail";


type DataFormat = {
    bookingId: string,
    patientName: string,
    patientPhone: string,
    patientDOB: string
}

export async function POST(req: NextRequest) {
    try {
        const formdata: DataFormat = await req.json()
        connectDB()
        const booking = await Booking.findOne({ bookingId: formdata.bookingId, patientName: formdata.patientName, patientPhone: formdata.patientPhone, patientDOB: formdata.patientDOB })
        if (!booking) return NextResponse.json({ message: 'Invalid credentials ! Please check your data', messageType: 'error' }, { status: 400 })
        if (booking.status == 'Cancelled') {
            return NextResponse.json({ message: 'Cancellation request has already been processed', messageType: 'error' }, { status: 409 })
        }
        await Cancelled.create(formdata)
        const cancelInfo = {
            bookId: formdata.bookingId,
            patientDOB: formdata.patientDOB,
            patientName: formdata.patientName,
            requestDate: new Date().toLocaleDateString('en-CA'),
            patientPhone: formdata.patientPhone
        }
        await sendCancellationRequestMail(cancelInfo)
        return NextResponse.json({ message: 'Cancellation request submitted successfully', messageType: 'success' }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Booking not found', messageType: 'error' }, { status: 404 })
    }

}