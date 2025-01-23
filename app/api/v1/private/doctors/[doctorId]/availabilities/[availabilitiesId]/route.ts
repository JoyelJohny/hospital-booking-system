import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Availability from "@/models/availabilities"


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ doctorId: string, availabilitiesId: string }> }) {
    try {
        const { doctorId, availabilitiesId } = await params
        const updatedAvailability = await req.json();
        connectDB()
        const isAvailabilitiesIdValid = await Availability.findOne({ $and: [{ _id: availabilitiesId, doctorId: doctorId }] })
        if (!isAvailabilitiesIdValid) return NextResponse.json({ message: "Availability not found for this doctor", messageType: 'error' }, { status: 404 })
        await Availability.findByIdAndUpdate(availabilitiesId, updatedAvailability, { new: true })
        return NextResponse.json({ message: "Availability Updated Successfully", messageType: 'success', updatedAvailability })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Invalid Update data", messageType: 'error' }, { status: 400 })
    }

}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ doctorId: string, availabilitiesId: string }> }) {
    try {
        const { doctorId, availabilitiesId } = await params
        connectDB()
        const isAvailabilitiesIdValid = await Availability.findOne({ $and: [{ _id: availabilitiesId, doctorId: doctorId }] })
        if (!isAvailabilitiesIdValid) return NextResponse.json({ message: "Availability not found for this doctor", messageType: 'error' }, { status: 404 })
        await Availability.findByIdAndDelete(availabilitiesId);
        return NextResponse.json({ message: "Availability Deleted Successfully", messageType: 'success' }, { status: 200 })
    } catch (error) {
        console.error(error)
    }

}