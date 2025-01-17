import Doctor from "@/models/doctor"
import { connectDB } from "@/libs/dbConnection"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ doctorId: string }> }) {
    const doctorId = (await params).doctorId
    connectDB()
    let data
    try {
        data = await Doctor.findById(doctorId, 'name specialization contact')


    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }

    return NextResponse.json(data)
}