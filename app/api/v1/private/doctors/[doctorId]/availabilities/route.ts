import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Availability from "@/models/availabilities"
import Doctor from "@/models/doctor"

export async function POST(req: NextRequest, { params }: { params: Promise<{ doctorId: string }> }) {
    const availabilityData = await req.json()
    const doctorId = (await params).doctorId
    const isDoctorIdValid = await Doctor.exists({ _id: doctorId })
    if (!isDoctorIdValid) {
        return NextResponse.json({ error: "Doctor not found" }, { status: 404 })
    }
    connectDB()
    const data = await Availability.create({ doctorId: doctorId, ...availabilityData })

    return NextResponse.json({ message: "Availability set successfully", availabilityData: data }, { status: 201 })
}