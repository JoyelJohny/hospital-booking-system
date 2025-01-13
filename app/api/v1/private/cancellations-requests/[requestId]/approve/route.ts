import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Cancelled from "@/models/cancellation_request"

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ requestId: string }> }) {
    const requestId = (await params).requestId
    connectDB()
    const isRequestIdValid = Cancelled.exists({ _id: requestId })
    if (!isRequestIdValid) return NextResponse.json({ error: "Cancellation request not found" }, { status: 404 })
    const bookingId = await Cancelled.findById(requestId)
    console.log(bookingId)
    // const data = await Cancelled.findByIdAndUpdate(requestId, { status: "Approved" })
    return NextResponse.json(bookingId)
}