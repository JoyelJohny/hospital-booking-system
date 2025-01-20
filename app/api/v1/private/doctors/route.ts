import Doctor from "@/models/doctor";
import Treatment from "@/models/treatments";
import { connectDB } from "@/libs/dbConnection";
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    try {
        connectDB();
        const doctors = await Doctor.find()
        doctors.forEach((doctor) => (doctor.name = `Dr ${doctor.name}`))
        const treatments = await Treatment.find({}, 'name')
        console.log(doctors)
        if (doctors.length == 0) {
            return NextResponse.json({ message: "No doctors available", treatments })
        }
        return NextResponse.json({ message: "Data fetched successfully", doctors, treatments })
    } catch (error) {
        throw new Error('Error with fetching data')
    }


}

export async function POST(req: NextRequest) {
    try {
        const { name, treatmentId, contact, specialization } = await req.json();
        const isTreatmentIdValid = await Treatment.exists({ _id: treatmentId })
        if (!isTreatmentIdValid) {
            return NextResponse.json({ error: "Associated treatment not found" }, { status: 404 })
        }
        await Doctor.create({ name: name, treatmentId, contact, specialization })
        return NextResponse.json({ message: "Doctor created successfully" }, { status: 201 })
    } catch (error) {
        if (error instanceof Error) {

            if (error.name == "ValidationError") return NextResponse.json({ error: "Doctor name, specialization, treatmentId and contact are required" }, { status: 400 })
        }
    }

}