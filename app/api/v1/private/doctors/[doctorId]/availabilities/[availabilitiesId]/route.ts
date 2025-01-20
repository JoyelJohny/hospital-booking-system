import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Availability from "@/models/availabilities"


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ doctorId: string, availabilitiesId: string }> }) {
    const { doctorId, availabilitiesId } = await params
    console.log({ doctorId, availabilitiesId })
    const updatedAvailability = await req.json();
    connectDB()
    const isAvailabilitiesIdValid = await Availability.findOne({ $and: [{ _id: availabilitiesId, doctorId: doctorId }] })
    if (!isAvailabilitiesIdValid) return NextResponse.json({ message: "Availability not found for this doctor" }, { status: 404 })

    try {
        await Availability.findByIdAndUpdate(availabilitiesId, updatedAvailability, { new: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Invalid Update data" }, { status: 400 })
    }
    return NextResponse.json({ message: "Availability Updated Successfully", updatedAvailability })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ doctorId: string, availabilitiesId: string }> }) {
    const { doctorId, availabilitiesId } = await params
    connectDB()
    const isAvailabilitiesIdValid = await Availability.findOne({ $and: [{ _id: availabilitiesId, doctorId: doctorId }] })
    if (!isAvailabilitiesIdValid) return NextResponse.json({ error: "Availability not found for this doctor" }, { status: 404 })
    await Availability.findByIdAndDelete(availabilitiesId);
    return NextResponse.json({ message: "Availability Deleted Successfully" })
}