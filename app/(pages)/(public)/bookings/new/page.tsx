"use client"


import Link from "next/link";
import { useState } from "react";
import RequestFormSlide1 from "./components/RequestFormSlide1";
import RequestFormSlide2 from "./components/RequestFormSlide2";
import RequestFormSlide3 from "./components/RequestFormSlide3";



// const api_url = process.env.NEXT_PUBLIC_API_URI

export default function AppointmentBooking() {
    const [form1Modal, setForm1Modal] = useState(true)
    const [form2Modal, setForm2Modal] = useState(false)
    const [form3Modal, setForm3Modal] = useState(false)



    return (<>
        <div className="flex flex-col gap-5 px-5 py-5 lg:px-10 xl:px-32">
            <div className="text-xs">&gt; <Link href="/" className="text-blue-700">Home</Link> &gt; <Link href="/bookings/new" className="text-blue-700">Request Appointment</Link></div>

            <div className="flex flex-col bg-white rounded-xl border border-blue-700 p-2 h-96 ">
                {form1Modal && <RequestFormSlide1 currentModal={setForm1Modal} nextModal={setForm2Modal} />}
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