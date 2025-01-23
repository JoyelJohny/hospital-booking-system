import Doctor from '@/models/doctor'
import { connectDB } from '@/libs/dbConnection'
import { NextRequest, NextResponse } from 'next/server'
import Availability from '@/models/availabilities';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ doctorId: string }> }) {

    const doctorId = (await params).doctorId
    const { name,
        treatmentId,
        contact,
        specialization } = await req.json();

    let data
    connectDB()
    try {
        const isDoctorIdValid = await Doctor.exists({ _id: doctorId })
        if (!isDoctorIdValid) {
            return NextResponse.json({ message: "Doctor not Found", messageType: 'error' }, { status: 404 })
        }
        data = await Doctor.findByIdAndUpdate(doctorId, {
            name: name.split(' ')[1],
            treatmentId,
            contact,
            specialization
        }, { new: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Invalid update data", messageType: 'error' }, { status: 400 })
    }
    return NextResponse.json({ message: "Doctor updated successfully", messageType: 'success', updatedDoctor: data })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ doctorId: string }> }) {
    const doctorId = (await params).doctorId
    const isDoctorIdValid = await Doctor.exists({ _id: doctorId })
    if (!isDoctorIdValid) return NextResponse.json({ message: "Doctor not found", messageType: 'error' }, { status: 404 })
    connectDB()
    try {
        await Doctor.findByIdAndDelete(doctorId)
        await Availability.deleteMany({ doctorId: doctorId })
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json({ message: "Doctor Deleted successfully", messageType: 'success' }, { status: 200 })

}