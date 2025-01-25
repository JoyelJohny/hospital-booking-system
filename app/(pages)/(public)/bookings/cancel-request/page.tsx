"use client"
import Message from "@/app/(components)/MessageComponent";
import Form from "next/form";
import { useEffect, useState } from "react";

const api_url = process.env.NEXT_PUBLIC_API_URI

export default function CancellationRequest() {
    const [trigger, setTrigger] = useState(0)
    const [response, setResponse] = useState<{ message: '', messageType: '' } | null>(null)
    const [today, setToday] = useState<string>()
    useEffect(() => {
        const todayDate = new Date()
        setToday(todayDate.toLocaleDateString('en-CA'))
    }, [])

    const handleRequestFormSubmit = async (formData: FormData) => {
        try {
            const data = JSON.stringify(Object.fromEntries(formData))
            const res = await fetch(`${api_url}/api/v1/public/bookings/cancel-request`, { method: "POST", body: data })
            const result = await res.json()
            if (result) {
                setResponse({ message: result.message, messageType: result.messageType })
                setTrigger((prev) => prev + 1)
            }

        } catch (error) {
            console.error(error)
        }
    }


    return (<>
        <div className="px-24 py-10 bg-gray-100">
            <Form action={handleRequestFormSubmit} className="flex flex-col bg-[#086788] p-6 w-fit space-y-5 shadow-2xl rounded-lg justify-self-center mt-20 justify-between">
                <h1 className=" text-4xl font-semibold ">Request Cancellation</h1>
                <div className="flex flex-row justify-between ">
                    <label className="font-semibold py-2  text-nowrap w-40">Booking Id</label>
                    <input type="text" required name="bookingId" className="rounded-md text-black p-1 focus:outline-slate-600 w-full" />
                </div>
                <div className="flex flex-row justify-between ">
                    <label className="font-semibold py-2  text-nowrap w-40">Name</label>
                    <input type="text" required name="patientName" className="rounded-md text-black p-1 focus:outline-slate-600 w-full" />
                </div>
                <div className=" flex justify-between  ">
                    <label className="font-semibold py-2  text-nowrap w-40">Phone No</label>
                    <input type="text" name="patientPhone" pattern="^\+91\d{10}$" title="Phone number must start with +91 and be followed by 10 digits" placeholder="+91-XXX-XXX-XXXX" required className=" rounded-md text-black p-1 focus:outline-slate-600  w-full" />

                </div>
                <div className=" flex justify-between ">
                    <label className="font-semibold py-2 text-nowrap w-40">Date Of Birth</label>
                    <input type="date" name="patientDOB" placeholder="dd-mm-yyyy" required min={"1905-01-15"} max={today} className=" rounded-md text-black py-1 px-2 focus:outline-slate-600  w-full placeholder:text-slate-100" />

                </div>

                <button type="submit" className="rounded-md  px-4 py-2 my-4 border-2 border-white text-2xl font-semibold hover:bg-green-400 hover:border-transparent">Submit</button>
            </Form>
            {response && <Message trigger={trigger} message={response.message} messageType={response.messageType} />}
        </div>
    </>)
}