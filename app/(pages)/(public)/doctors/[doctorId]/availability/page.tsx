"use client"
import DateComponent from "@/app/(components)/DateComponent";
import DividerComponent from "@/app/(components)/DividerComponent";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Availability() {
    const { doctorId } = useParams<{ doctorId: string }>()
    const [date, setDate] = useState<Date | null>(new Date())
    const getAvailable = async () => {
        await fetch(`http://localhost:3000/api/v1/public/doctors/${doctorId}/timeslots?date=${date}`)
    }
    const getDate = (date: Date | null) => {
        setDate(date)
    }
    console.log(date)
    return (<>
        <div className="px-24 py-10 bg-gray-100">
            <div className="rounded-xl px-6 py-4 bg-[#086788] border-2">
                <p className="text-2xl font-bold">Dr John Doe </p>
                <div className="flex justify-between">
                    <div>
                        <p className="text-sm">Cardiology</p>
                        <p className="text-xs">johndoe@gmail.com</p>
                    </div>

                </div>
            </div>

            <div className="flex h-3/4 p-6 rounded-xl justify-between">
                <div className="flex gap-3">
                    <p className="p-2 text-slate-600">Pick a Date</p>
                    <DateComponent sendDate={getDate} />
                </div>
                <button className="px-4 py-2 bg-green-400 rounded-lg font-semibold shadow-lg" onClick={getAvailable}>check</button>


            </div>
            <DividerComponent />
        </div>
    </>)
}