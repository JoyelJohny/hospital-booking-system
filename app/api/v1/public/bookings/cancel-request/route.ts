import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Cancelled from "@/models/cancellation_request"

export async function POST(req: NextRequest) {
    const formdata = await req.json()
    console.log(formdata)
    connectDB()
    const data = await Cancelled.create(formdata)
    return NextResponse.json(data)
}