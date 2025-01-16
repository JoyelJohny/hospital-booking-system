"use client"
import DateComponent from "@/app/(components)/DateComponent";
import DividerComponent from "@/app/(components)/DividerComponent";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Doctor {
    _id: string,
    name: string,
    specialization: string,
    contact: string
}

interface Available {
    _id: string,
    dayOfWeek: string,
    startTime: string,
    endTime: string,
    status: string
}


export default function Availability() {
    const { doctorId } = useParams<{ doctorId: string }>()
    const [available, setAvailable] = useState<Available[]>([])
    const [doctordetail, setDoctor] = useState<Doctor>()
    const [date, setDate] = useState<Date | null>(null)

    useEffect(() => { setDate(new Date()) }, [])

    const getAvailable = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/v1/public/doctors/${doctorId}/timeslots?date=${date}`)
            const { availableList, doctor } = await res.json()

            setAvailable(availableList)
            setDoctor(doctor)
        } catch (error) {

        }

    }

    const handleClick = (e: React.MouseEvent, isBooked: boolean) => {
        if (isBooked) { e.preventDefault() }

    }

    const getDate = (date: Date | null) => {
        setDate(date)
    }
    console.log(date)
    return (<>
        <div className="px-24 py-10 bg-gray-100">
            <div className="rounded-xl px-6 py-4 bg-[#086788] border-2">
                <p className="text-2xl font-bold">{doctordetail?.name}</p>
                <div className="flex justify-between">
                    <div>
                        <p className="text-sm">{doctordetail?.specialization}</p>
                        <p className="text-xs">{doctordetail?.contact}</p>
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

            <table className="table-auto w-full border-separate border-spacing-y-4">
                <thead className="text-black border-">
                    <tr>
                        <th className=" p-4 ">Date</th>
                        <th>Day</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Status</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {available.map((slot) => (
                        <tr key={slot._id} className="bg-[#086788] text-center font-semibold ">
                            <td className="p-4 rounded-tl-2xl rounded-bl-2xl ">{date?.toLocaleDateString()}</td>
                            <td>{slot.dayOfWeek}</td>
                            <td>{slot.startTime}</td>
                            <td>{slot.endTime}</td>
                            <td className={`${slot.status == "Booked" ? "bg-red-400" : "bg-green-400"}`}>{slot.status}</td>
                            <td className="p-4 rounded-tr-2xl rounded-br-2xl"><Link href="/bookings/new" className={`py-1 px-3 rounded-md ${slot.status == "Booked" ? "bg-gray-400 hover:cursor-not-allowed" : "bg-green-400 hover:scale-105"}`} onClick={(e) => handleClick(e, slot.status == "Booked")}>BooK</Link></td>
                        </tr>
                    ))}

                </tbody>
            </table>


            {/* <div className="flex justify-around px-6 py-4 text-black border-2">
                <div>Date</div>
                <div>Day</div>
                <div>startTime</div>
                <div>endTime</div>
                <div>status</div>
                <button>Book</button>
            </div>
            <div className="flex justify-between rounded-xl px-6 py-4 bg-[#086788] border-2">
                <div>{date?.toLocaleDateString()}</div>
                <div>Day</div>
                <div>startTime</div>
                <div>endTime</div>
                <div>status</div>
                <button>Book</button>
            </div> */}
        </div>
    </>)
}