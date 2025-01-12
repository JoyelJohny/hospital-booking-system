import Doctor from "@/models/doctor";
import Treatment from "@/models/treatments";
import { connectDB } from "@/libs/dbConnection";
import { NextRequest, NextResponse } from "next/server"



export async function GET() {

    connectDB();
    let data = [];
    data = await Doctor.find()
    if (data.length == 0) {
        return NextResponse.json({ message: "No doctors available" }, { status: 404 })
    }
    return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
    let data

    try {
        data = await req.json();
        const isTreatmentIdValid = await Treatment.exists({ _id: data.treatmentId })
        if (!isTreatmentIdValid) {
            return NextResponse.json({ error: "Associated treatment not found" }, { status: 404 })
        }
        await Doctor.create(data)
    } catch (error) {
        if (error instanceof Error) {

            if (error.name == "ValidationError") return NextResponse.json({ error: "Doctor name, specialization, treatmentId and contact are required" }, { status: 400 })
        }
    }

    return NextResponse.json(data)
}