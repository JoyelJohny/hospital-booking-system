import { connectDB } from "@/libs/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Treatment from '@/models/treatments'


export async function GET() {
    try {
        connectDB()
        const data = await Treatment.find().sort({ createdAt: -1 });
        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
    }


}

export async function POST(req: NextRequest) {

    if (req.headers.get('content-length') == '0') {
        return NextResponse.json({ message: "Treatment name and Description are required" }, { status: 404 })
    }

    connectDB();

    const data = await req.json();

    try {
        const { name, description } = await Treatment.create(data)
        return NextResponse.json({ message: "Treatment created successfully", messageType: 'success', treatment: { name: name, description: description } }, { status: 201 })
    } catch (error) {
        if (error instanceof Error) {
            if (error.name == "ValidationError") return NextResponse.json({ message: "One field is Empty", messageType: 'error' }, { status: 409 })
            else if (error.name == 'MongoServerError') return NextResponse.json({ message: "Treatment already created", messageType: 'error' }, { status: 409 })
        }

    }



}
