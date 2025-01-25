"use client"
import DividerComponent from "@/app/(components)/DividerComponent";
import Cookies from 'js-cookie'
import { useEffect, useState } from "react";
import { getTimings } from "@/libs/utils";
import Form from "next/form";
import Message from "@/app/(components)/MessageComponent";

type Data = {
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

const api_url = process.env.NEXT_PUBLIC_API_URI

export default function AppointmentBooking() {
    const [trigger, setTrigger] = useState(0)
    const [response, setResponse] = useState<{ message: '', messageType: '' } | null>(null)
    const [date] = useState<string>(new Date().toLocaleDateString('en-CA'))
    const [data, setData] = useState<Data>(
        {
            doctor:
            {
                _id: '',
                name: '',
                specialization: '',
                contact: ''
            },
            availability:
            {
                _id: '',
                dayOfWeek: '',
                startTime: '',
                endTime: '',
                status: ''
            },
            date: ''
        })
    const Timings = getTimings(data.availability.startTime, data.availability.endTime)

    useEffect(() => {
        const cookie = Cookies.get('book-detail')
        const cookieData = cookie ? cookie : ' '
        setData(JSON.parse(cookieData))

    }, [])

    const sendBookingData = async (data: string) => {
        try {
            const res = await fetch(`${api_url}/api/v1/public/bookings`, { method: "POST", body: data })
            const result = await res.json()
            if (result) {
                setResponse({ message: result.message, messageType: result.messageType })
                setTrigger((prev) => prev + 1)
            }

        } catch (error) {
            console.error(error)
        }
    }

    const handleBookingFormSubmit = (formData: FormData) => {

        formData.append('drId', data.doctor._id)
        formData.append('slotId', data.availability._id)
        formData.append('date', data.date)
        const dataToSend = JSON.stringify(Object.fromEntries(formData))
        sendBookingData(dataToSend)
    }

    return (<>
        <div className="px-24 py-6 bg-gray-100">
            <Form action={handleBookingFormSubmit} className="flex flex-col bg-[#086788] px-6 py-4 w-fit h-fit shadow-2xl rounded-lg justify-self-center justify-between">
                <h1 className=" text-4xl font-semibold mb-6 text-center">Book an Appointment</h1>
                <h2 className="font-semibold text-lg">Appointment Details</h2>
                <DividerComponent />
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm">Consultation By</div><div className="text-sm" >: {data.doctor.name}</div></div>
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm">Treatment</div><div className="text-sm">: {data.doctor.specialization}</div></div>
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm">Date</div><div className="text-sm">: {data.date}</div></div>
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
                    <div className="flex gap-8 justify-between"><label className="py-2 font-semibold text-sm">Age</label> <input name="age" type="number" min={0} max={120} required className="text-black p-2 rounded-md focus:outline-slate-500 w-full" /></div>
                    <div className="flex gap-4 justify-between"><label className="py-2 font-semibold text-sm">D.O.B</label> <input name="dob" type="date" min={"1905-01-01"} max={date} required className="text-black p-2 rounded-md focus:outline-slate-500 w-full" /></div>
                    <div className="flex gap-4 justify-between"><label className="py-2 font-semibold text-sm">Phone</label> <input name="phone" type="text" pattern="^\+91\d{10}$" title="Phone number must start with +91 and be followed by 10 digits" placeholder="+91-XXX-XXX-XXXX" required className="text-black p-2 rounded-md focus:outline-slate-500" /></div>
                    <div className="flex gap-4 justify-between"><label className="py-2 font-semibold text-sm">Email</label> <input name="email" type="email" required className="text-black p-2 rounded-md focus:outline-slate-500" /></div>
                </div>
                <div className="flex flex-col my-2 gap-4">
                    <label className="font-semibold text-sm">Additonal Description (Optional)</label>
                    <textarea name="description" className="text-black rounded-md p-2"></textarea>
                </div>
                <button type="submit" className="rounded-md  px-4 py-2 my-4 border-2 border-white text-2xl font-semibold hover:bg-green-400 hover:border-transparent">Submit</button>
            </Form>
            {response && <Message trigger={trigger} message={response.message} messageType={response.messageType} />}
        </div>
    </>)
}