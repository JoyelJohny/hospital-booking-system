import Doctor from "@/models/doctor";
import Treatment from "@/models/treatments";
import { connectDB } from "@/libs/dbConnection";
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    try {
        connectDB();
        const doctors = await Doctor.find()
        doctors.forEach((doctor) => (doctor.name = `Dr. ${doctor.name}`))
        const treatments = await Treatment.find({}, 'name')
        return NextResponse.json({ message: "Data fetched successfully", doctors, treatments })
    } catch (error) {
        console.error(error)
        throw new Error('Error with fetching data')
    }
}