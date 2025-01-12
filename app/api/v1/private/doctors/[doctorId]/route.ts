import Doctor from '@/models/doctor'
import { connectDB } from '@/libs/dbConnection'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ doctorId: string }> }) {

    const doctorId = (await params).doctorId
    const data1 = await req.json();
    let data
    connectDB()
    try {
        const isDoctorIdValid = await Doctor.exists({ _id: doctorId })
        if (!isDoctorIdValid) {
            return NextResponse.json({ error: "Doctor not Found" }, { status: 404 })
        }
        data = await Doctor.findByIdAndUpdate(doctorId, data1, { new: true })
    } catch (error) {
        return NextResponse.json({ error: "Invalid update data" }, { status: 400 })
    }
    return NextResponse.json({ message: "Doctor updated successfully", updatedDoctor: data })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ doctorId: string }> }) {
    const doctorId = (await params).doctorId
    const isDoctorIdValid = await Doctor.exists({ _id: doctorId })
    if (!isDoctorIdValid) return NextResponse.json({ error: "Doctor not found" }, { status: 404 })
    connectDB()
    try {
        await Doctor.findByIdAndDelete(doctorId)
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json({ message: "Doctor Deleted successfully" }, { status: 200 })

}