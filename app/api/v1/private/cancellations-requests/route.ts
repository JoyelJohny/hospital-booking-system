import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Cancelled from "@/models/cancellation_request"
import { dateFormatter } from "@/libs/bookIdGenerator";

export async function GET(req: NextRequest) {
    connectDB()
    const data = await Cancelled.find().lean()
    data.forEach((cancel) => (cancel.requestDate = dateFormatter(cancel.requestDate)))
    return NextResponse.json(data)
}