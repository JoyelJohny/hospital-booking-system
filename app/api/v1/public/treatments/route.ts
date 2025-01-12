import { connectDB } from "@/libs/dbConnection"
import Treatment from "@/models/treatments"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {

    connectDB()
    let data
    try {
        data = await Treatment.find();
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }

    return NextResponse.json(data)
}