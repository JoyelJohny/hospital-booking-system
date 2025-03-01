"use client"


import Link from "next/link";
import { useEffect, useState } from "react";
import RequestFormSlide1 from "./components/RequestFormSlide1";
import RequestFormSlide2 from "./components/RequestFormSlide2";
import RequestFormSlide3 from "./components/RequestFormSlide3";



const api_url = process.env.NEXT_PUBLIC_API_URI

export default function AppointmentBooking() {
    const [selectedTreatment, setSelectedTreatment] = useState('')
    const [selectedDate, getSelectedDate] = useState<Date | null>(null)
    const [treatments, setTreatments] = useState<{ _id: string, name: string }[]>([])
    // const [doctors, setDoctors] = useState<{_id:string,name:string,specialization:string,contact:string}>
    const [form1Modal, setForm1Modal] = useState(true)
    const [form2Modal, setForm2Modal] = useState(false)
    const [form3Modal, setForm3Modal] = useState(false)

    useEffect(() => {
        getTreatments()
    }, [])

    const getTreatments = async () => {
        const res = await fetch(`${api_url}/api/v1/public/treatments`, { method: 'GET' })
        const result = await res.json()
        setTreatments(result)
        setSelectedTreatment(result[0]._id)
    }

    const handleRequestFormSlide1Submit = async (selectedTreatment: string) => {
        const res = await fetch(`${api_url}/api/v1/public/treatments/${selectedTreatment}/doctors`, { method: 'GET' })
        const result = await res.json()
        console.log(result)
        setForm1Modal(prev => !prev)
        setForm2Modal(prev => !prev)
        console.log(selectedDate)
    }



    return (<>
        <div className="flex flex-col gap-5 px-5 py-5 lg:px-10 xl:px-32">
            <div className="text-xs">&gt; <Link href="/" className="text-blue-700">Home</Link> &gt; <Link href="/bookings/new" className="text-blue-700">Request Appointment</Link></div>

            <div className="flex flex-col bg-white rounded-xl border border-blue-700 p-2 h-96 ">
                {form1Modal && <RequestFormSlide1 getSelectedDate={getSelectedDate} formSubmit={handleRequestFormSlide1Submit} treatments={treatments} selectedTreatment={selectedTreatment} setSelectedTreatment={setSelectedTreatment} />}
                {form2Modal && <RequestFormSlide2 prevModal={setForm1Modal} currentModal={setForm2Modal} nextModal={setForm3Modal} />}
                {form3Modal && <RequestFormSlide3 prevModal={setForm2Modal} currentModal={setForm3Modal} nextModal={setForm1Modal} />}


            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Other Options</h2>
                <button className="text-blue-700 text-xs w-fit">Know your Cancelled Appointment Status</button>
                <button className="text-blue-700 text-xs w-fit">Cancel Booked Appointment</button>
            </div>

        </div>
    </>)
}