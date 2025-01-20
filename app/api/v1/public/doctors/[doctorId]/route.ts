import Doctor from "@/models/doctor"
import { connectDB } from "@/libs/dbConnection"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ doctorId: string }> }) {
    try {
        const doctorId = (await params).doctorId
        connectDB()
        const data = await Doctor.findById(doctorId, 'name specialization contact')
        data.name = `Dr ${data.name}`
        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }




}