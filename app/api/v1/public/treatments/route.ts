import { connectDB } from "@/libs/dbConnection"
import Treatment from "@/models/treatments"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        connectDB()
        const data = await Treatment.find({}, '_id name');
        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }


}