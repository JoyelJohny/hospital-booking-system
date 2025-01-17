import Doctor from "@/models/doctor"
import { connectDB } from "@/libs/dbConnection"
import Availability from "@/models/availabilities"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ doctorId: string }> }) {
    const doctorId = (await params).doctorId
    const date = req.nextUrl.searchParams.get('date')
    enum day { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday }
    if (!date) {
        throw new Error('Date query parameter is missing');
    }
    const dateOb = new Date(date)



    connectDB()
    let data
    try {

        data = await Availability.find({ doctorId: doctorId, dayOfWeek: day[dateOb.getUTCDay()] }, 'dayOfWeek startTime endTime status')
        console.log(data)

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }

    return NextResponse.json({ availableList: data })
}