import { connectDB } from "@/libs/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Treatment from '@/models/treatments'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ treatmentId: string }> }) {
    const treatmentId = (await params).treatmentId
    const data = await req.json()
    connectDB()
    await Treatment.findByIdAndUpdate(treatmentId, data)

    return NextResponse.json({ message: "Treatment Updated Successfully", messageType: 'success' }, { status: 200 })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ treatmentId: string }> }) {
    const treatmentId = (await params).treatmentId;
    connectDB()
    await Treatment.findByIdAndDelete(treatmentId)
    return NextResponse.json({ message: "Deleted Treatment Successfully", messageType: 'success' }, { status: 200 })
}