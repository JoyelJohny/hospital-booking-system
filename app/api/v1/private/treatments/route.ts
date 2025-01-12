import { connectDB } from "@/libs/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Treatment from '@/models/treatments'



export async function POST(req: NextRequest) {

    if (req.headers.get('content-length') == '0') {
        return NextResponse.json({ message: "Treatment name and Description are required" }, { status: 404 })
    }

    connectDB();

    const data = await req.json();
    let treatment
    try {
        treatment = await Treatment.create(data)
    } catch (error) {
        if (error instanceof Error) {
            if (error.name == "ValidationError") return NextResponse.json({ message: "One field is Empty" }, { status: 409 })
            else if (error.name == 'MongoServerError') return NextResponse.json({ message: "Treatment already created" }, { status: 409 })
        }

    }

    return NextResponse.json({ message: "Treatment created successfully", treatment }, { status: 201 })

}
