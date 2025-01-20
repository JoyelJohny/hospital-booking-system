"use client"
import Image from "next/image"
import reject from "@/public/reject.png"
import Logout from "@/app/(components)/LogoutComponent"
import { useRouter } from "next/navigation"
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
    const router = useRouter()
    const [token, setToken] = useState<string | null>(null)
    const [cancellations, setCancellations] = useState<Cancellations[]>()
    const [selectedCancellation, setSelectedCancellation] = useState<Cancellations>({ _id: '', bookingId: '', patientName: '', patientPhone: '', patientDOB: '', requestDate: '', status: '' })
    const [requestModal, setRequestModal] = useState(false)

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {

            router.push('/login');
        } else {
            setToken(storedToken);
        }
    }, [router]);

    useEffect(() => {
        if (token) {
            getCancelRequestData()
        }
    }, [token]);

    const getCancelRequestData = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/v1/private/cancellations-requests", { method: "GET", headers: { auth: `Bearer ${token}` } })
            const result = await res.json()
            if (!res.ok) {

                router.back()

            } else {
                setCancellations(result)
            }
        } catch (error) {
            console.error(error)
        }
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

    const handleClick = (d: Cancellations) => {
        setRequestModal(!requestModal)
        setSelectedCancellation(d)
    }

    const handleApproveButton = async () => {
        try {
            setRequestModal(!requestModal)
            const res = await fetch(`http://localhost:3000/api/v1/private/cancellations-requests/${selectedCancellation._id}/approve`, { method: 'PATCH', headers: { auth: `Bearer ${token}` } })
            await res.json()
            getCancelRequestData()
        } catch (error) {
            console.error(error)
        }

    }

    const handleRejectButton = async () => {
        try {
            setRequestModal(!requestModal)
            const res = await fetch(`http://localhost:3000/api/v1/private/cancellations-requests/${selectedCancellation._id}/reject`, { method: 'PATCH', headers: { auth: `Bearer ${token}` } })
            await res.json()
            getCancelRequestData()
        } catch (error) {
            console.error(error)
        }
    }

    return (<>
        <div className=" px-40 py-5 space-y-10">
            <div className="space-y-5">
                <h1 className="text-[#086788] text-5xl font-semibold w-full">Cancellation Requests</h1>
                <div className="text-black flex gap-2 justify-between">
                    <div className="flex gap-2"><div className="w-10 h-10 rounded-full bg-[#086788]"></div><span className="py-2">Pending Cancellations</span></div>
                    <div className="flex gap-2"><div className="w-10 h-10 rounded-full bg-green-400"></div><span className="py-2">Approved Cancellations</span></div>
                    <div className="flex gap-2"><div className="w-10 h-10 rounded-full bg-red-400"></div><span className="py-2">Rejected Cancellations</span></div>

                </div>
            </div>

            {!cancellations && (<div className="text-black text-center text-3xl pt-10">Not made any cancellation requests</div>)}

            <div className="grid grid-cols-3 gap-5">
                {Array.isArray(cancellations) && cancellations.sort((a, b) => (b.requestDate.localeCompare(a.requestDate))).map((cancellation) => (<button key={cancellation._id} onClick={() => handleClick(cancellation)} className={`flex py-2 px-4 rounded-lg text-lg text-start hover:bg-green-400 hover:scale-105 drop-shadow-xl ${setRequestCompColor(cancellation.status)}`}> {cancellation.bookingId}</button>
                ))}

            </div>
            {requestModal && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col  px-6 py-4 w-fit h-fit shadow-2xl rounded-lg justify-self-center justify-between border-4 bg-[#086788]">
                    <button className="ml-auto w-8 h-8  p-1 mb-2 rounded-lg text-white bg-[#086788] hover:bg-red-400" onClick={() => (setRequestModal(!requestModal))}><Image src={reject} width={24} height={24} alt="close the availability modal" /></button>
                    <h1 className=" text-4xl font-semibold mb-6 text-center">Cancellation Request</h1>

                    <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24 text-nowrap ">Booking ID</div><div className="text-sm">: {selectedCancellation.bookingId}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Status</div><div className={`text-sm ${statusColourSetter(selectedCancellation.status)}`}>: {selectedCancellation?.status}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Patient Name</div><div className="text-sm">: {selectedCancellation.patientName}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Patient Phone</div><div className="text-sm">: {selectedCancellation.patientPhone}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Patient DOB</div><div className="text-sm">: {selectedCancellation.patientDOB}</div></div>
                        <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Request Date</div><div className="text-sm">: {selectedCancellation.requestDate}</div></div>


                    </div>
                    {selectedCancellation?.status == "Pending" ? (<div className="flex gap-4">
                        <button className="rounded-md w-full px-4 py-2 my-4 border-2 border-white text-2xl font-semibold hover:bg-green-400 hover:border-transparent" onClick={handleApproveButton}>Approve</button>
                        <button className="rounded-md w-full px-4 py-2 my-4 border-2 border-white text-2xl font-semibold hover:bg-red-400 hover:border-transparent" onClick={handleRejectButton}>Reject</button>
                    </div>) : ""}

                </div>

            )}

            <Logout />
        </div>
    </>)
}