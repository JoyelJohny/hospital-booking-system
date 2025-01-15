import Treatment from "@/models/treatments"
import Doctor from "@/models/doctor"
import { connectDB } from "@/libs/dbConnection"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ treatmentId: string }> }) {
    console.log("hello")
    const treatmentId = (await params).treatmentId
    connectDB()
    let data, data1
    try {
        console.log(treatmentId)
        data = await Doctor.find({ treatmentId: treatmentId })
        data1 = await Treatment.findById(treatmentId)
    } catch (error) {

        return NextResponse.json({ error: "Internal Server Error" },
            { status: 500 }
        )
    }
    if (!data) {
        console.log(data, data1, treatmentId)
        return NextResponse.json({ error: "Treatment not found" }, { status: 404 })
    }
    return NextResponse.json({ doctorsList: data, treatment: data1 }, { status: 200 })
}