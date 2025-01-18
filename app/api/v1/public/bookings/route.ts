import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/booking"
import { connectDB } from "@/libs/dbConnection";
import Availability from "@/models/availabilities";
import Doctor from "@/models/doctor";
import { createBookingId } from "@/libs/bookIdGenerator";

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
    const data: dataFormat = await req.json()
    const bookingId = createBookingId(data.name, data.phone, data.dob)
    connectDB()
    const slot = await Availability.findById(data.slotId).select('-_id startTime endTime').lean()
    const doctor = await Doctor.findById(data.drId, 'treatmentId')
    const booked = await Booking.create({
        bookingId: bookingId,
        patientName: data.name,
        patientAge: data.age,
        patientGender: data.gender,
        patientEmail: data.email,
        patientPhone: data.phone,
        patientDOB: data.dob,
        treatmentId: doctor.treatmentId,
        doctorId: data.drId,
        date: data.date,
        additionalNotes: data.description,
        ...slot,
    })

    return NextResponse.json(data)
}