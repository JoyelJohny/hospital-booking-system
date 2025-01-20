import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Cancelled from "@/models/cancellation_request"
import booking from "@/models/booking";
import { verifyUserForBookingCancellation } from "@/libs/bookIdGenerator";

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
        const isBookingIdValid = await booking.findOne({ bookingId: formdata.bookingId })
        if (!isBookingIdValid) return NextResponse.json({ error: "Invalid BookingId" })
        console.log(isBookingIdValid)
        if (!verifyUserForBookingCancellation(formdata.patientName, formdata.patientPhone, formdata.patientDOB, isBookingIdValid.treatment.Id, isBookingIdValid.doctor.Id, formdata.bookingId)) return NextResponse.json({ error: "Invalid credentials" })
        console.log("hello")
        await Cancelled.create(formdata)
        return NextResponse.json(formdata)
    } catch (error) {
        console.error(error)
    }

}