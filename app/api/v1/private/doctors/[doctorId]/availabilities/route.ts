import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Availability from "@/models/availabilities"
import Doctor from "@/models/doctor"

export async function POST(req: NextRequest, { params }: { params: Promise<{ doctorId: string }> }) {
    const { startTime, endTime, slotDuration, bufferTime, dayOfWeek } = await req.json()

    const doctorId = (await params).doctorId
    const isDoctorIdValid = await Doctor.exists({ _id: doctorId })
    if (!isDoctorIdValid) {
        return NextResponse.json({ error: "Doctor not found" }, { status: 404 })
    }
    connectDB()
    const data = await Availability.create({ doctorId: doctorId, startTime, endTime, slotDuration: Number(slotDuration), bufferTime: Number(bufferTime), dayOfWeek })

    return NextResponse.json({ message: "Availability set successfully", data }, { status: 201 })
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ doctorId: string }> }) {
    try {
        const doctorId = (await params).doctorId
        const data = await Availability.find({ doctorId })
        if (data.length == 0) return NextResponse.json({ message: "No Schedules" })
        return NextResponse.json(data)
    } catch (error) {
        console.log(error)
        return NextResponse.error()
    }
}