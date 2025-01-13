import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Cancelled from "@/models/cancellation_request"

export async function GET(req: NextRequest) {
    connectDB()
    const data = await Cancelled.find()
    return NextResponse.json(data)
}