"use client"
import Image from "next/image"
import reject from "@/public/reject.png"
import { useEffect, useState } from "react"
import DividerComponent from "@/app/(components)/DividerComponent"
import Logout from "@/app/(components)/LogoutComponent"
import { getTimings } from "@/libs/utils"
import Loading from "@/app/(components)/LoadingComponent"
import Message from "@/app/(components)/MessageComponent"
import Link from "next/link"
import SearchBar from "@/app/(components)/SearchBarComponent"
import BookingDetailModal from "./Components/BookingDetailModal"


type Bookings = {
    _id: string,
    bookingId: string,
    patientName: string,
    patientAge: string,
    patientGender: string,
    patientEmail: string,
    patientPhone: string,
    patientDOB: string,
    doctor: { name: string, doctorId: string, }
    treatment: { name: string, treatmentId: string }
    available: { availableId: string, startTime: string, endTime: string }
    date: string,
    additionalNotes: string,
    status: string

}

const api_url = process.env.NEXT_PUBLIC_API_URI

export default function Booking() {
    const [trigger, setTrigger] = useState(0)
    const [response, setResponse] = useState<{ message: '', messageType: '' } | null>(null)
    const [isLoading, setLoading] = useState<boolean>(true)
    const [bookings, setBookings] = useState<Bookings[]>([])
    const [appointmentModal, setAppointmentModal] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState<Bookings>({
        _id: '',
        bookingId: '',
        patientName: '',
        patientAge: '',
        patientGender: '',
        patientEmail: '',
        patientPhone: '',
        patientDOB: '',
        doctor: { name: '', doctorId: '' },
        treatment: { name: '', treatmentId: '' },
        available: { startTime: '', endTime: '', availableId: '' },
        date: '',
        additionalNotes: '',
        status: ''
    })

    useEffect(() => {
        getBookingsData()
    }, [])



    const getBookingsData = async () => {
        try {
            setLoading(true)
            const res = await fetch(`${api_url}/api/v1/private/bookings`, { method: "GET", credentials: 'include' })
            const result = await res.json()
            setBookings(result)

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleCancelAppointment = async () => {
        try {
            setAppointmentModal(!appointmentModal)
            const id = selectedAppointment.bookingId
            const res = await fetch(`${api_url}/api/v1/private/bookings/${id}/cancel`, { method: "PATCH", credentials: 'include' })
            const result = await res.json()
            if (result) {
                setResponse({ message: result.message, messageType: result.messageType })
                setTrigger((prev) => prev + 1)
            }
            getBookingsData()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex flex-col h-full bg-slate-800">
            <div className="h-[8%] w-full px-5 py-2  rounded-b-lg lg:hidden">
                <div className="flex  gap-2 items-center justify-start">

                    <div className="text-lg font-semibold text-nowrap text-white">Holy Memorial Hospital</div>
                </div>
            </div>
            <div className="h-[92%] p-2 lg:h-full">
                <div className="relative flex flex-col h-full gap-2 px-3 py-3  rounded-md bg-white overflow-hidden lg:px-5 lg:py-5">
                    <div className="space-y-2">
                        <h1 className="text-slate-800 text-lg font-semibold lg:text-2xl">Manage Appointments</h1>
                        <SearchBar
                            placeHolder="Search Appointments"
                            searchAction={console.log}
                            searchBoxStyling="flex h-8"
                            textBoxStyling="w-full py-1 px-3 text-xs focus:outline-none border border-r-0 rounded-l-full border-slate-700"
                            searchButtonStyling="flex border border-slate-800 bg-slate-800 rounded-r-full items-center justify-center w-12"
                        />
                        <div className="flex text-sm justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <span>Appointments</span>
                            </div>

                            <span className="p-2">Option</span>
                        </div>
                        <hr className="border-slate-800" />
                    </div>
                    <div className="flex flex-col overflow-auto gap-2">
                        {bookings.map((booking) =>
                            <div key={booking._id} className="flex justify-between py-1 px-2 border rounded-lg border-slate-800 text-sm items-center">
                                <span className="text-xs ">{booking.bookingId}</span>
                                <button className="text-xs text-white font-semibold px-4 w-fit py-1 h-fit bg-slate-800 rounded-md" onClick={() => setAppointmentModal(prev => !prev)}>View</button>
                            </div>
                        )}


                    </div>
                    {appointmentModal && <BookingDetailModal closeModal={setAppointmentModal} />}
                </div>
            </div>
        </div>
    )
    // <div className="flex flex-col px-5 py-5 h-full gap-4 lg:px-10 xl:px-32">
    //     <div className="text-xs">&gt; <Link href="/admin/dashboard" className="text-blue-700">Home</Link> &gt; <Link href="/admin/bookings" className="text-blue-700">Bookings</Link></div>
    //     <h1 className="text-blue-700 font-semibold text-4xl">Bookings</h1>
    //     <div className="grid grid-cols-2 gap-4 text-white md:grid-cols-3 xl:grid-cols-4">
    //         <div className="flex flex-col bg-blue-600 w-full rounded-md p-3 lg:hover:cursor-pointer lg:hover:bg-gradient-to-l lg:hover:from-blue-500 lg:hover:to-blue-700">
    //             <h2 className="text-xs lg:text-sm">HBS12312312</h2>
    //         </div>

    //     </div>
    // </div>)
    {/* <div className="flex flex-col px-40 py-5 space-y-5 h-full  "> */ }

    {/* <h1 className="text-[#086788] text-5xl  font-semibold">Bookings</h1>

            {isLoading ? <Loading /> : (<div>{bookings.length == 0 && (<div className="text-[#086788] pt-44 text-center text-3xl ">No new Bookings have been made</div>)}

                <div className="grid grid-cols-2 gap-10 w-full h-full place-content-center ">

                    {bookings.map((booking) => (
                        <div key={booking._id} className="flex flex-col bg-[#086788] p-6 h-16 justify-center rounded-xl hover:scale-105 hover:cursor-pointer hover:bg-green-400 hover:border-transparent drop-shadow-xl" onClick={() => { setSelectedAppointment(booking); setAppointmentModal(!appointmentModal) }}>
                            <div className="flex justify-between">
                                <span className="text-2xl px-2 py-1 rounded-lg font-semibold " >{booking.bookingId}</span>
                            </div>
                        </div>



                    ))}


                </div></div>)} */}



    {/* {appointmentModal && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col bg-[#086788] px-6 py-4 w-fit h-fit shadow-2xl rounded-lg justify-between border-4">
                    <button className="ml-auto w-8 h-8  p-1 mb-2 rounded-lg text-white bg-[#086788] hover:bg-red-400" onClick={() => (setAppointmentModal(!appointmentModal))}><Image src={reject} width={24} height={24} alt="close the availability modal" />
                    </button>
                    <h1 className=" text-4xl font-semibold mb-6 text-center">Appointment</h1>
                    <h2 className="font-semibold text-lg">Appointment Details</h2>
                    <h3 className="font-semibold text-sm w-24 text-nowrap pt-2">ID: {selectedAppointment.bookingId}</h3>
                    <DividerComponent />
                    <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24 text-nowrap ">Consultation By</div><div className="text-sm">: {selectedAppointment.doctor.name}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Treatment</div><div className="text-sm">: {selectedAppointment.treatment.name}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Date</div><div className="text-sm">: {selectedAppointment.date}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Timings</div><div className="text-sm">: {getTimings(selectedAppointment.available.startTime, selectedAppointment.available.endTime)}</div></div>
                    </div>
                    <h2 className="mt-8 font-semibold text-lg">Patient Details</h2>
                    <DividerComponent />

                    <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-20">Name</div><div className="text-sm">: {selectedAppointment.patientName}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-20">Gender</div><div className="text-sm">: {selectedAppointment.patientGender}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-20">Age</div><div className="text-sm">: {selectedAppointment.patientAge}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-20">DOB</div><div className="text-sm">: {selectedAppointment.patientDOB}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-20">Phone</div><div className="text-sm">: {selectedAppointment.patientPhone}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-20">Email</div><div className="text-sm">: {selectedAppointment.patientEmail}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-20">Status</div><div className="text-sm">: {selectedAppointment.status}</div></div>


                    </div>
                    <div className=" flex gap-4 my-3 "><div className=" font-semibold text-sm w-20 py-2">Description</div><textarea readOnly className="text-sm bg-gray-100 w-full h-12 text-black rounded p-2" value={selectedAppointment.additionalNotes}></textarea></div>
                    <div className="flex">
                        <button className="rounded-md w-full px-4 py-2 my-4 border-2 border-white text-2xl font-semibold hover:bg-red-400 hover:border-transparent" onClick={handleCancelAppointment}>Cancel Appointment</button>
                    </div>
                </div>
            )} */}


    {/* </div> */ }

}