import Treatment from "@/models/treatments"
import { connectDB } from "@/libs/dbConnection"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ treatmentId: string }> }) {
    const treatmentId = (await params).treatmentId
    connectDB()
    let data
    try {
        data = await Treatment.findById(treatmentId)
    } catch (error) {

        return NextResponse.json({ error: "Internal Server Error" },
            { status: 500 }
        )
    }
    if (!data) {
        return NextResponse.json({ error: "Treatment not found" }, { status: 404 })
    }
    return NextResponse.json(data, { status: 200 })
}