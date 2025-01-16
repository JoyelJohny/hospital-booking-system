"use client"
import Image from "next/image"
import reject from "@/public/reject.png"
import { useEffect, useState } from "react"
import DividerComponent from "@/app/(components)/DividerComponent"


interface Bookings {
    _id: string,
    bookingId: string,
    patientName: string,
    patientAge: string,
    patientGender: string,
    patientEmail: string,
    patientPhone: string,
    patientDOB: string,
    treatmentId: string
    doctorId: string,
    date: string,
    startTime: string,
    endTime: string,
    additionalNotes: string,
    status: string

}

export default function Booking() {
    const [bookings, setBookings] = useState<Bookings[]>([])
    const [selectedAppointment, setSelectedAppointment] = useState<Bookings | undefined>()
    const [appointmentModal, setAppointmentModal] = useState(false)
    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch("http://localhost:3000//api/v1/private/bookings", { method: "GET" })
                const result = await res.json()
                console.log(result)
                setBookings(result)
            } catch (error) {

            }
        }
        getData()
    }, [])
    return (<>
        <div className=" px-40 py-10 ">

            <div className="flex text-black p-6 justify-center">
                <h2 className=" w-full text-2xl font-semibold text-center">Bookings Pending</h2>

            </div>

            <div className="grid grid-cols-2 gap-10 w-full h-full place-content-center ">

                {bookings.map((booking) => (
                    <div key={booking._id} className="flex flex-col bg-[#086788] p-6 h-16 justify-center rounded-xl hover:scale-105 hover:cursor-pointer drop-shadow-xl" >
                        <div className="flex justify-between">
                            <button className="text-2xl px-2 py-1 rounded-lg font-semibold hover:bg-green-400 hover:border-transparent" onClick={() => { setSelectedAppointment(booking); setAppointmentModal(!appointmentModal) }}>{booking.bookingId}</button>
                            <button className="w-10 h-10 hover:bg-red-400 p-2 rounded-xl"><Image src={reject} width={24} height={24} alt="delete button image" /></button>
                        </div>
                    </div>



                ))}


            </div>

            {appointmentModal && (<div onClick={() => setAppointmentModal(!appointmentModal)} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-[#086788]/10"><div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col bg-[#086788] px-6 py-4 w-fit h-fit shadow-2xl rounded-lg justify-self-center justify-between border-4">
                <h1 className=" text-4xl font-semibold mb-6 text-center">Appointment</h1>
                <h2 className="font-semibold text-lg">Appointment Details</h2>
                <DividerComponent />
                <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24 text-nowrap ">Consultation By</div><div className="text-sm">: {selectedAppointment?.doctorId}</div></div>
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Treatment</div><div className="text-sm">: {selectedAppointment?.treatmentId}</div></div>
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Date</div><div className="text-sm">: {selectedAppointment?.date}</div></div>
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Timings</div><div className="text-sm">: 10:00 am - 12:00 pm</div></div>
                </div>
                <h2 className="mt-8 font-semibold text-lg">Patient Details</h2>
                <DividerComponent />

                <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm w-20">Name</div><div className="text-sm">: Dr John Doe</div></div>
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm w-20">Gender</div><div className="text-sm">: Cardiology</div></div>
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm w-20">Age</div><div className="text-sm">: 22-12-2024</div></div>
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm w-20">DOB</div><div className="text-sm">: 10:00 am - 12:00 pm</div></div>
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm w-20">Phone</div><div className="text-sm">: Dr John Doe</div></div>
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm w-20">Email</div><div className="text-sm">: Cardiology</div></div>
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm w-20">Status</div><div className="text-sm">: 10:00 am - 12:00 pm</div></div>


                </div>
                <div className=" flex gap-4 my-3 "><div className=" font-semibold text-sm w-20 py-2">Description</div><textarea readOnly className="text-sm bg-gray-100 w-full h-12 text-black rounded p-2" value={'22-12-2024'}></textarea></div>
                <div className="flex">
                    <button className="rounded-md w-full px-4 py-2 my-4 border-2 border-white text-2xl font-semibold hover:bg-red-400 hover:border-transparent">Cancel Appointment</button>
                </div>


            </div></div>

            )}


        </div>
    </>)
}