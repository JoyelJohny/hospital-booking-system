import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/booking"
import { connectDB } from "@/libs/dbConnection";
import Availability from "@/models/availabilities";
import Doctor from "@/models/doctor";
import { createBookingId } from "@/libs/bookIdGenerator";
import Treatment from "@/models/treatments";

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
    connectDB()
    const slot = await Availability.findById(data.slotId).select('startTime endTime')
    const doctor = await Doctor.findById(data.drId, 'treatmentId name')
    const treatment = await Treatment.findById(doctor.treatmentId, 'name')
    const bookingId = createBookingId(data.name, data.phone, data.dob, doctor.treatmentId, data.drId)
    const booked = await Booking.create({
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
    return NextResponse.json(booked)
}