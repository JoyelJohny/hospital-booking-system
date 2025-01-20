import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/dbConnection";
import Cancelled from "@/models/cancellation_request"

export async function GET(req: NextRequest) {
    try {

        connectDB()
        const data = await Cancelled.find().lean()
        data.forEach((item) => (item.requestDate = (item.requestDate).toLocaleDateString('en-CA')))

        return NextResponse.json(data)

    } catch (error) {

        console.error(error)
        return NextResponse.error()
    }

}