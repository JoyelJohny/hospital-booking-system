import { connectDB } from "@/libs/dbConnection"
import Availability from "@/models/availabilities"
import Booking from "@/models/booking"
import { NextRequest, NextResponse } from "next/server"


enum day { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday }


export async function GET(req: NextRequest, { params }: { params: Promise<{ doctorId: string }> }) {
    try {
        const doctorId = (await params).doctorId

        const date = req.nextUrl.searchParams.get('date')

        if (!date) { throw new Error('Date query parameter is missing') }

        const dateOb = new Date(date)

        connectDB()

        const data = await Availability.find({ doctorId: doctorId, dayOfWeek: day[dateOb.getUTCDay()] }, 'dayOfWeek startTime endTime').lean()

        const bookings = await Booking.find({ "doctor.Id": doctorId, date: dateOb.toLocaleDateString('en-CA', { timeZone: 'UTC' }), status: 'Confirmed' })

        const bookedSlotIds = new Set(bookings.map((booked) => ((booked.available.Id).toString())))

        data.forEach((slot) => {
            const slotId = slot._id as object
            slot.status = bookedSlotIds.has(slotId.toString()) ? 'Booked' : 'Available'
        })

        console.log(data)

        return NextResponse.json({ availableList: data })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }

}