"use client"

import DateComponent from "@/app/(components)/DateComponent";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import back from "@/public/back.png"


const api_url = process.env.NEXT_PUBLIC_API_URI

export default function AppointmentBooking() {
    const [date, setDate] = useState<Date | null>(null)
    const getDate = (date: Date | null) => {
        setDate(date)
    }


    return (<>
        <div className="flex flex-col gap-5 px-5 py-5 lg:px-10 xl:px-32">
            <div className="text-xs">&gt; <Link href="/" className="text-blue-700">Home</Link> &gt; <Link href="/bookings/new" className="text-blue-700">Request Appointment</Link></div>

            <div className="flex flex-col bg-white rounded-xl border border-blue-700 p-2 h-96 ">
                <div className=" h-full ">
                    <div className="flex  items-center">
                        <Image src={back} alt="" className="size-4 " />
                        <p className="font-semibold w-full  text-center">Appointment Request</p>
                    </div>
                    <div className="flex items-center justify-center h-full">
                        <div className="flex flex-col text-xs gap-10">
                            <div className="flex  gap-4 items-center">
                                <label htmlFor="">Choose your Treatment</label>
                                <select name="" id="" className="border p-1 rounded-md border-blue-700">
                                    <option value="Cardiology">Cardiology</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <p>Pick a Date</p><DateComponent sendDate={getDate} className="block" />
                            </div>
                        </div>
                    </div>

                </div>



            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Other Options</h2>
                <button className="text-blue-700 text-xs w-fit">Know your Cancelled Appointment Status</button>
                <button className="text-blue-700 text-xs w-fit">Cancel Booked Appointment</button>
            </div>

        </div>
    </>)
}