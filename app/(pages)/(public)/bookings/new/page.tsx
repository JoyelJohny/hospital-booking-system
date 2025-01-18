"use client"
import DividerComponent from "@/app/(components)/DividerComponent";
import Cookies from 'js-cookie'
import { FormEvent, useEffect, useState } from "react";
import { getTimings } from "@/libs/time";

interface Data {
    doctor: {
        _id: string,
        name: string,
        specialization: string,
        contact: string
    },
    availability: {
        _id: string,
        dayOfWeek: string,
        startTime: string,
        endTime: string,
        status: string
    },
    date: string
}

export default function AppointmentBooking() {
    const cdata = Cookies.get('book-detail')

    const [data, setData] = useState<Data | undefined>(undefined)
    const Timings = getTimings(data ? data.availability.startTime : "", data ? data.availability.endTime : "")
    useEffect(() => {
        const b = cdata ? cdata : ""
        setData(JSON.parse(b))

    }, [])

    const sendData = async (data: string) => {
        try {
            const res = await fetch("http://localhost:3000/api/v1/public/bookings", { method: "POST", body: data })
            const result = res.json()
            console.log(result)
        } catch (error) {

        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        formData.append('drId', data ? data.doctor._id : "")
        formData.append('slotId', data ? data.availability._id : "")
        formData.append('date', data ? data.date : "")
        const dataToSend = JSON.stringify(Object.fromEntries(formData))
        sendData(dataToSend)


    }

    return (<>
        <div className="px-24 py-6 bg-gray-100">
            <form onSubmit={handleSubmit} className="flex flex-col bg-[#086788] px-6 py-4 w-fit h-fit shadow-2xl rounded-lg justify-self-center justify-between">
                <h1 className=" text-4xl font-semibold mb-6 text-center">Book an Appointment</h1>
                <h2 className="font-semibold text-lg">Appointment Details</h2>
                <DividerComponent />
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm">Consultation By</div><div className="text-sm" >: {data ? data.doctor.name : ""}</div></div>
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm">Treatment</div><div className="text-sm">: {data ? data.doctor.specialization : ""}</div></div>
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm">Date</div><div className="text-sm">: {data ? data.date : ""}</div></div>
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm">Timings</div><div className="text-sm">: {Timings}</div></div>
                </div>
                <h2 className="mt-8 font-semibold text-lg">Patient Details</h2>
                <DividerComponent />

                <div className="grid grid-cols-2 gap-x-4 gap-y-4 my-2">
                    <div className="flex gap-4 justify-between"><label className="py-2 font-semibold text-sm">Name</label> <input name="name" type="text" required className="text-black p-2 rounded-md focus:outline-slate-500" /></div>
                    <div className="flex gap-2 justify-between">
                        <label className="py-2 font-semibold text-sm">Gender</label>
                        <select name="gender" required className="text-black p-2 rounded-md focus:outline-slate-500 w-full">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Others</option>
                        </select>
                    </div>
                    <div className="flex gap-4 justify-between"><label className="py-2 font-semibold text-sm">Age</label> <input name="age" type="text" required className="text-black p-2 rounded-md focus:outline-slate-500" /></div>
                    <div className="flex gap-4 justify-between"><label className="py-2 font-semibold text-sm">D.O.B</label> <input name="dob" type="date" required className="text-black p-2 rounded-md focus:outline-slate-500 w-full" /></div>
                    <div className="flex gap-4 justify-between"><label className="py-2 font-semibold text-sm">Phone</label> <input name="phone" type="text" required className="text-black p-2 rounded-md focus:outline-slate-500" /></div>
                    <div className="flex gap-4 justify-between"><label className="py-2 font-semibold text-sm">Email</label> <input name="email" type="email" required className="text-black p-2 rounded-md focus:outline-slate-500" /></div>
                </div>
                <div className="flex flex-col my-2 gap-4">
                    <label className="font-semibold text-sm">Additonal Description (Optional)</label>
                    <textarea name="description" className="text-black rounded-md p-2"></textarea>
                </div>
                <button type="submit" className="rounded-md  px-4 py-2 my-4 border-2 border-white text-2xl font-semibold hover:bg-green-400 hover:border-transparent">Submit</button>


            </form>
        </div>
    </>)
}