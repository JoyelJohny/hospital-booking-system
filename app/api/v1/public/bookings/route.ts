import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/booking"
import { connectDB } from "@/libs/dbConnection";
import Availability from "@/models/availabilities";
import Doctor from "@/models/doctor";
import { createBookingId } from "@/libs/bookIdGenerator";
import Treatment from "@/models/treatments";
import { getTimings } from "@/libs/utils";
import { sendBookingConfirmationMail } from "@/libs/mail";

type dataFormat = {
    name: string,
    gender: string,
    age: string,
    dob: string,
    phone: string,
    email: string,
    description: string,
    drId: string,
    slotId: string,
    date: string
}
export async function POST(req: NextRequest) {
    try {
        const date = new Date().toString()
        const data: dataFormat = await req.json()
        connectDB()
        const slot = await Availability.findById(data.slotId).select('startTime endTime')
        const doctor = await Doctor.findById(data.drId, 'treatmentId name')
        const treatment = await Treatment.findById(doctor.treatmentId, 'name')
        if (!doctor || !treatment) {
            return NextResponse.json({ message: 'Doctor or treatment not found', messageType: 'error' }, { status: 404 })
        }
        const isBookedAlready = await Booking.findOne({ "doctor.Id": data.drId, "treatment.Id": doctor.treatmentId, date: data.date, "available.Id": slot._id })
        if (isBookedAlready) {
            return NextResponse.json({ message: 'This Slot has been book Already', messageType: 'error' }, { status: 409 })
        }
        const bookingId = createBookingId(data.name, date, doctor.treatmentId, data.drId)
        await Booking.create({
            bookingId: bookingId,
            patientName: data.name,
            patientAge: Number(data.age),
            patientGender: data.gender,
            patientEmail: data.email,
            patientPhone: data.phone,
            patientDOB: data.dob,
            treatment: { name: treatment.name, Id: doctor.treatmentId },
            doctor: { name: doctor.name, Id: data.drId },
            available: { Id: slot._id, startTime: slot.startTime, endTime: slot.endTime },
            date: data.date,
            additionalNotes: data.description,
        })
        const bookInfo = {
            bookId: bookingId,
            treatment: treatment.name,
            doctor: doctor.name,
            date: data.date,
            time: getTimings(slot.startTime, slot.endTime)
        }
        await sendBookingConfirmationMail(data.name, data.email, bookInfo)
        return NextResponse.json({ messageType: 'success', message: 'Booking Successful' }, { status: 201 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ messageType: 'error', message: 'Internal Server Error' }, { status: 500 })
    }

}