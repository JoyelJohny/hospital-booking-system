import Treatment from "@/models/treatments"
import { connectDB } from "@/libs/dbConnection"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ treatmentId: string }> }) {
    try {
        const treatmentId = (await params).treatmentId
        connectDB()
        const data = await Treatment.findById(treatmentId)
        if (!data) {
            return NextResponse.json({ error: "Treatment not found" }, { status: 404 })
        }
        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        console.error(error)
    }



}