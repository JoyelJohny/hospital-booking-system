import Treatment from "@/models/treatments"
import Doctor from "@/models/doctor"
import { connectDB } from "@/libs/dbConnection"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ treatmentId: string }> }) {
    try {
        const treatmentId = (await params).treatmentId
        connectDB()

        const treatment = await Treatment.findById(treatmentId, 'name description')

        if (!treatment) {
            return NextResponse.json({ error: "Treatment not found" }, { status: 404 })
        }

        const doctors = await Doctor.find({ treatmentId: treatmentId })

        if (doctors.length == 0) {
            return NextResponse.json({ message: "No Doctors Available" })
        }

        doctors.forEach((doctor) => (doctor.name = `Dr ${doctor.name}`))
        console.log(doctors)

        return NextResponse.json({ doctorsList: doctors, treatment: treatment }, { status: 200 })
    } catch (error) {
        console.error(error)
    }
}