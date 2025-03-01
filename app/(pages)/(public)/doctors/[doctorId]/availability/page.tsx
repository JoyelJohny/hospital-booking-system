"use client"
import DateComponent from "@/app/(components)/DateComponent";
import DividerComponent from "@/app/(components)/DividerComponent";
import Loading from "@/app/(components)/LoadingComponent";
import { getTimings } from "@/libs/utils";
import Cookies from 'js-cookie'
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Doctor = {
    _id: string,
    name: string,
    specialization: string,
    contact: string
}

type Available = {
    _id: string,
    dayOfWeek: string,
    startTime: string,
    endTime: string,
    status: string
}

const api_url = process.env.NEXT_PUBLIC_API_URI

export default function Availability() {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [isSlotLoading, setSlotLoading] = useState<boolean>(true)
    const { doctorId } = useParams<{ doctorId: string }>()
    const [available, setAvailable] = useState<Available[]>([])
    const [doctordetail, setDoctor] = useState<Doctor>({ _id: '', name: '', specialization: '', contact: '' })
    const [date, setDate] = useState<Date | null>(null)

    useEffect(() => {
        setDate(new Date())
        async function getDoctorDetail() {
            try {
                const res = await fetch(`${api_url}/api/v1/public/doctors/${doctorId}`, { method: "GET" })
                const result = await res.json()
                setDoctor(result)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        getDoctorDetail()
    }, [])

    useEffect(() => {
        if (date) {
            getAvailableData()
        }
    }, [date])

    const getAvailableData = async () => {
        try {
            setSlotLoading(true)
            const res = await fetch(`${api_url}/api/v1/public/doctors/${doctorId}/timeslots?date=${date}`)
            const { availableList } = await res.json()
            setAvailable(availableList)
        } catch (error) {
            console.error(error)
        } finally {
            setSlotLoading(false)
        }
    }

    const handleClick = (e: React.MouseEvent, isBooked: boolean, slot: Available) => {
        if (isBooked) { e.preventDefault() }
        else {
            if (Cookies.get("book-detail")) {
                Cookies.remove("book-detail")
            }
            Cookies.set("book-detail", JSON.stringify({ doctor: doctordetail, availability: slot, date: date?.toLocaleDateString('en-CA') }), { expires: 1 })
        }
    }


    return (<>
        <div className="flex flex-col px-24 py-10 h-full">
            {isLoading ?
                <Loading />
                :
                (<div>
                    <div className="rounded-xl px-6 py-4 bg-[#086788] border-2">
                        <p className="text-2xl font-bold">{doctordetail.name}</p>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm">{doctordetail.specialization}</p>
                                <p className="text-xs">{doctordetail.contact}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl justify-between">
                        <div className="flex gap-3">
                            <p className="p-2 text-slate-600">Pick a Date</p>
                            <DateComponent sendDate={setDate} />
                        </div>
                    </div>

                    <DividerComponent />
                    <div className="">
                        {isSlotLoading ? <Loading className="flex flex-1 mt-32 items-center justify-center" /> : (
                            <div>
                                {available.length > 0 ? (
                                    <table className="table-auto w-full border-separate border-spacing-y-4">
                                        <thead className="text-black border-">
                                            <tr>
                                                <th className=" p-4 ">Date</th>
                                                <th>Day</th>
                                                <th>Timings</th>
                                                <th>Status</th>
                                                <th>Option</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {available.sort((a, b) => ((a.startTime).localeCompare(b.startTime))).map((slot) => (
                                                <tr key={slot._id} className="bg-[#086788] text-center font-semibold ">
                                                    <td className="p-4 rounded-tl-2xl rounded-bl-2xl ">{date?.toLocaleDateString('en-CA')}</td>
                                                    <td>{slot.dayOfWeek}</td>
                                                    <td>{getTimings(slot.startTime, slot.endTime)}</td>
                                                    <td className={`${slot.status == "Booked" ? "bg-red-400" : "bg-green-400"}`}>{slot.status}</td>
                                                    <td className="p-4 rounded-tr-2xl rounded-br-2xl"><Link href="/bookings/new" className={`py-1 px-3 rounded-md ${slot.status == "Booked" ? "bg-gray-400 hover:cursor-not-allowed" : "bg-green-400 hover:scale-105"}`} onClick={(e) => handleClick(e, slot.status == "Booked", slot)}>BooK</Link></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>) : (<div className="text-center  text-[#086788] text-3xl pt-32">Slots not available on this day</div>)
                                }
                            </div>
                        )}
                    </div>

                </div>
                )}
        </div>
    </>)
}