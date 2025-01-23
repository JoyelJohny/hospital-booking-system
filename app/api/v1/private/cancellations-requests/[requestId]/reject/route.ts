import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Cancelled from "@/models/cancellation_request"

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ requestId: string }> }) {
    try {
        const requestId = (await params).requestId
        connectDB()
        const isRequestIdValid = Cancelled.exists({ _id: requestId })
        if (!isRequestIdValid) return NextResponse.json({ message: "Cancellation request not found", messageType: 'error' }, { status: 404 })
        const bookingId = await Cancelled.findById(requestId)
        console.log(bookingId)
        await Cancelled.findByIdAndUpdate(requestId, { status: "Rejected" })
        return NextResponse.json({ message: 'Cancellation has been Rejected', messageType: 'success' }, { status: 200 })
    } catch (error) {
        console.error(error)
    }

}