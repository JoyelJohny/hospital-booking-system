"use client"
// import Image from "next/image"
// import reject from "@/public/reject.png"
// import Logout from "@/app/(components)/LogoutComponent"
import { useEffect, useState } from "react"
// import Loading from "@/app/(components)/LoadingComponent"
// import Message from "@/app/(components)/MessageComponent"
// import Link from "next/link"
import SearchBar from "@/app/(components)/SearchBarComponent"
import RequestDetailModal from "./Components/RequestDetailModal"

interface Cancellations {
    _id: string,
    bookingId: string,
    patientName: string,
    patientPhone: string,
    patientDOB: string,
    requestDate: string,
    status: 'Pending' | 'Approved' | 'Rejected'

}

const api_url = process.env.NEXT_PUBLIC_API_URI

export default function Cancellation() {
    // const [trigger, setTrigger] = useState(0)
    // const [response, setResponse] = useState<{ message: '', messageType: '' } | null>(null)
    // const [isLoading, setLoading] = useState<boolean>(true)
    const [cancellations, setCancellations] = useState<Cancellations[]>([])
    // const [selectedCancellation, setSelectedCancellation] = useState<Cancellations>({ _id: '', bookingId: '', patientName: '', patientPhone: '', patientDOB: '', requestDate: '', status: 'Approved' })
    const [requestModal, setRequestModal] = useState(false)



    useEffect(() => {

        getCancelRequestData()
    }
        , []);

    const getCancelRequestData = async () => {
        try {
            // setLoading(true)
            const res = await fetch(`${api_url}/api/v1/private/cancellations-requests`, { method: "GET", credentials: 'include' })
            const result = await res.json()
            setCancellations(result)
        } catch (error) {
            console.error(error)
        } finally {
            // setLoading(false)
        }
    }

    // const statusColourSetter = (s: string | undefined) => {
    //     if (s == "Pending") return "text-yellow-400"
    //     else if (s == "Approved") return "text-green-400"
    //     else return "text-red-400"
    // }

    // const setRequestCompColor = (s: string | undefined) => {
    //     if (s == "Rejected") return "bg-red-400"
    //     else if (s == "Approved") return "bg-green-400"
    //     else return "bg-[#086788]"
    // }

    // const handleClick = (d: Cancellations) => {
    //     setRequestModal(!requestModal)
    //     setSelectedCancellation(d)
    // }

    // const handleApproveButton = async () => {
    //     try {
    //         setRequestModal(!requestModal)
    //         const res = await fetch(`${api_url}/api/v1/private/cancellations-requests/${selectedCancellation._id}/approve`, { method: 'PATCH', credentials: 'include' })
    //         const result = await res.json()
    //         // if (result) {
    //         //     setResponse({ message: result.message, messageType: result.messageType })
    //         //     setTrigger((prev) => prev + 1)
    //         // }

    //         getCancelRequestData()
    //     } catch (error) {
    //         console.error(error)
    //     }

    // }

    // const handleRejectButton = async () => {
    //     try {
    //         setRequestModal(!requestModal)
    //         const res = await fetch(`${api_url}/api/v1/private/cancellations-requests/${selectedCancellation._id}/reject`, { method: 'PATCH', credentials: 'include' })
    //         const result = await res.json()
    //         // if (result) {
    //         //     setResponse({ message: result.message, messageType: result.messageType })
    //         //     setTrigger((prev) => prev + 1)
    //         // }

    //         getCancelRequestData()
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

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
                        <h1 className="text-slate-800 text-lg font-semibold lg:text-2xl">Manage Cancellation Requests</h1>
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
                        {cancellations.map((cancellation) =>
                            <div key={cancellation._id} className="flex justify-between py-1 px-2 border rounded-lg border-slate-800 text-sm items-center">
                                <span className="text-xs ">{cancellation.bookingId}</span>
                                <button className="text-xs text-white font-semibold px-4 w-fit py-1 h-fit bg-slate-800 rounded-md" onClick={() => setRequestModal(prev => !prev)}>View</button>
                            </div>
                        )}

                    </div>
                    {requestModal && <RequestDetailModal closeModal={setRequestModal} />}
                </div>
            </div>
        </div>
        // <div className="flex flex-col px-5 py-5 h-full gap-4 lg:px-10 xl:px-32">
        //     <div className="text-xs">&gt; <Link href="/admin/dashboard" className="text-blue-700">Home</Link> &gt; <Link href="/admin/cancellations" className="text-blue-700">Cancellation Requests</Link></div>
        //     <h1 className="text-blue-700 font-semibold text-4xl">Cancellation Requests</h1>
        // </div>
    )
    // <div className="flex flex-col px-40 py-5 space-y-10 h-full">
    //     <div className="space-y-5">
    //         <h1 className="text-[#086788] text-5xl font-semibold w-full">Cancellation Requests</h1>
    //         <div className="text-black flex gap-2 justify-between">
    //             <div className="flex gap-2"><div className="w-10 h-10 rounded-full bg-[#086788]"></div><span className="py-2">Pending Cancellations</span></div>
    //             <div className="flex gap-2"><div className="w-10 h-10 rounded-full bg-green-400"></div><span className="py-2">Approved Cancellations</span></div>
    //             <div className="flex gap-2"><div className="w-10 h-10 rounded-full bg-red-400"></div><span className="py-2">Rejected Cancellations</span></div>

    //         </div>
    //     </div>
    // {isLoading ? <Loading /> : (<div>{cancellations.length == 0 && (<div className="text-[#086788] pt-36 text-center text-3xl ">No Cancel requests have been made</div>)}

    //     <div className="grid grid-cols-3 gap-5">
    //         {Array.isArray(cancellations) &&
    //             cancellations.sort((a, b) => {
    //                 const priority: { [key in 'Pending' | 'Approved' | 'Rejected']: number } = {
    //                     Pending: 0,
    //                     Approved: 1,
    //                     Rejected: 2,
    //                 };
    //                 if (a.requestDate == b.requestDate) {
    //                     return priority[a.status] - priority[b.status]
    //             }
    //             return priority[a.status] - priority[b.status]

    //         }).map((cancellation) => (<button key={cancellation._id} onClick={() => handleClick(cancellation)} className={`flex py-2 px-4 rounded-lg text-lg text-start hover:bg-green-400 hover:scale-105 drop-shadow-xl ${setRequestCompColor(cancellation.status)}`}> {cancellation.bookingId}</button>
    //         ))}

    // </div></div>)}


    // {requestModal && (
    //     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col  px-6 py-4 w-fit h-fit shadow-2xl rounded-lg justify-self-center justify-between border-4 bg-[#086788]">
    //         <button className="ml-auto w-8 h-8  p-1 mb-2 rounded-lg text-white bg-[#086788] hover:bg-red-400" onClick={() => (setRequestModal(!requestModal))}><Image src={reject} width={24} height={24} alt="close the availability modal" /></button>
    //         <h1 className=" text-4xl font-semibold mb-6 text-center">Cancellation Request</h1>

    //         <div className="grid grid-cols-2 gap-x-2 gap-y-2">
    //             <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24 text-nowrap ">Booking ID</div><div className="text-sm">: {selectedCancellation.bookingId}</div></div>
    //             <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Status</div><div className={`text-sm ${statusColourSetter(selectedCancellation.status)}`}>: {selectedCancellation?.status}</div></div>
    //             <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Patient Name</div><div className="text-sm">: {selectedCancellation.patientName}</div></div>
    //             <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Patient Phone</div><div className="text-sm">: {selectedCancellation.patientPhone}</div></div>
    //             <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Patient DOB</div><div className="text-sm">: {selectedCancellation.patientDOB}</div></div>
    //             <div className=" flex gap-4 "><div className=" font-semibold text-sm w-24">Request Date</div><div className="text-sm">: {selectedCancellation.requestDate}</div></div>


    //         </div>
    //         {selectedCancellation?.status == "Pending" ? (<div className="flex gap-4">
    //             <button className="rounded-md w-full px-4 py-2 my-4 border-2 border-white text-2xl font-semibold hover:bg-green-400 hover:border-transparent" onClick={handleApproveButton}>Approve</button>
    //             <button className="rounded-md w-full px-4 py-2 my-4 border-2 border-white text-2xl font-semibold hover:bg-red-400 hover:border-transparent" onClick={handleRejectButton}>Reject</button>
    //         </div>) : ""}

    //     </div>

    // )}

    //         <Logout />
    //         {response && <Message trigger={trigger} message={response.message} messageType={response.messageType} />}

    //     </div>
    // </>)
}