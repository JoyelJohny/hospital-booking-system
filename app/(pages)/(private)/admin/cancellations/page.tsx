"use client"

import ConfirmationComponent from "@/app/(components)/ConfirmationComponent"
import { useEffect, useState } from "react"

interface Cancellations {
    _id: string,
    bookingId: string,
    patientName: string,
    patientPhone: string,
    patientDOB: string,
    requestDate: string,
    status: string

}

export default function Cancellation() {
    const [cancellations, setCancellations] = useState<Cancellations[]>()
    const [selectedCancellation, setSelectedCancellation] = useState<Cancellations>()
    const [requestModal, setRequestModal] = useState(false)
    const [confirmModal, setConfirmModal] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        async function getData() {
            const res = await fetch("http://localhost:3000/api/v1/private/cancellations-requests", { method: "GET", headers: { auth: `Bearer ${token}` } })
            const result = await res.json()
            setCancellations(result)
        }
        getData()
    }, [])

    const sendData = () => {
        setConfirmModal(!confirmModal)
        console.log("hello")
    }

    const statusColourSetter = (s: string | undefined) => {
        if (s == "Pending") return "text-yellow-400"
        else if (s == "Approved") return "text-green-400"
        else return "text-red-400"
    }

    const setRequestCompColor = (s: string | undefined) => {
        if (s == "Rejected") return "bg-red-400"
        else if (s == "Approved") return "bg-green-400"
        else return "bg-[#086788]"
    }

    const handleClick = (d: Cancellations | undefined) => {
        setRequestModal(!requestModal)
        setSelectedCancellation(d)
    }
    return (<>
        <div className=" px-40 py-10 space-y-5">
            <h1 className="text-black text-5xl font-semibold w-full text-center">Cancellation Requests</h1>
            <div className="grid grid-cols-3 gap-5">
                {cancellations?.map((cancellation) => (<button key={cancellation._id} onClick={() => handleClick(cancellation)} className={`flex py-2 px-4 rounded-lg text-lg text-start hover:bg-green-400 hover:scale-105 drop-shadow-xl ${setRequestCompColor(cancellation.status)}`}> {cancellation.bookingId}</button>
                ))}

            </div>
            {requestModal && (
                <div onClick={() => setRequestModal(!requestModal)} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-[#086788]/10"><div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col  px-6 py-4 w-fit h-fit shadow-2xl rounded-lg justify-self-center justify-between border-4 bg-[#086788]">
                    <h1 className=" text-4xl font-semibold mb-6 text-center">Cancellation Request</h1>

                    <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24 text-nowrap ">Booking ID</div><div className="text-sm">: {selectedCancellation?.bookingId}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Status</div><div className={`text-sm ${statusColourSetter(selectedCancellation?.status)}`}>: {selectedCancellation?.status}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Patient Name</div><div className="text-sm">: {selectedCancellation?.patientName}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Patient Phone</div><div className="text-sm">: {selectedCancellation?.patientPhone}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Patient DOB</div><div className="text-sm">: {selectedCancellation?.patientDOB}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Request Date</div><div className="text-sm">: {selectedCancellation?.requestDate}</div></div>


                    </div>
                    {selectedCancellation?.status == "Pending" ? (<div className="flex gap-4">
                        <button className="rounded-md w-full px-4 py-2 my-4 border-2 border-white text-2xl font-semibold hover:bg-green-400 hover:border-transparent" onClick={() => setConfirmModal(!confirmModal)}>Approve</button>
                        <button className="rounded-md w-full px-4 py-2 my-4 border-2 border-white text-2xl font-semibold hover:bg-red-400 hover:border-transparent" onClick={() => setConfirmModal(!confirmModal)}>Reject</button>
                    </div>) : ""}





                </div></div>

            )}
            {confirmModal && <ConfirmationComponent falseOption={setConfirmModal} trueOption={sendData} />}
        </div>
    </>)
}