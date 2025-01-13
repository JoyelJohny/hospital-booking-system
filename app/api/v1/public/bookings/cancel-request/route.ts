import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Cancelled from "@/models/cancellation_request"

export async function POST(req: NextRequest) {
    const requestData = await req.json()
    connectDB()
    const data = await Cancelled.create(requestData)
    return NextResponse.json(data)
}