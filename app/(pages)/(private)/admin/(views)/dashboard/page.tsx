'use client'
import Image from "next/image";
import doctorIcon from "@/public/doctors.png"
import treatmentIcon from "@/public/treatments.png"
import bookingsIcon from "@/public/appointment.png"
import requestCancelIcon from "@/public/wrong-time.png"
import Link from "next/link";
// import { useSession } from "next-auth/react";

export default function Dashboard() {
    // const { data: session } = useSession()
    return (
        <div className="flex flex-col h-full bg-slate-800">
            <div className="h-[8%] w-full px-5 py-2  rounded-b-lg lg:hidden">
                <div className="flex  gap-2 items-center justify-start">

                    <div className="text-lg font-semibold text-nowrap text-white">Holy Memorial Hospital</div>
                </div>
            </div>
            <div className="h-[92%] p-2 lg:h-full">

                <div className="flex flex-col h-full gap-2 px-3 py-3  rounded-md bg-white overflow-hidden lg:px-5 lg:py-5">
                    <h1 className="text-slate-800 text-lg font-semibold lg:text-2xl">Dashboard</h1>

                    <div className="grow grid grid-cols-1 gap-3 md:grid-cols-2 text-white overflow-y-auto">
                        <Link href={'/admin/doctors'} className="bg-blue-700 rounded-md p-4 space-y-5 lg:space-y-10 lg:hover:cursor-pointer lg:hover:bg-gradient-to-l lg:hover:from-blue-500 lg:hover:to-blue-700">
                            <div className="flex gap-4 ">
                                <Image src={doctorIcon} className="size-8 lg:size-10" alt="" />
                                <p className="text-2xl lg:text-3xl">Doctors</p>
                            </div>
                            <div className="flex flex-col text-white text-xs gap-2 lg:text-sm">
                                <p>- Create Doctor</p>
                                <p>- Update Doctor</p>
                                <p>- Delete Doctor</p>
                                <p>- Create Schedule for Doctors</p>
                                <p>- Update Schedule for Doctors</p>
                                <p>- Delete Schedule for Doctors</p>
                            </div>
                        </Link>

                        <Link href={'/admin/treatments'} className="bg-blue-700 rounded-md p-4 space-y-5 lg:space-y-10 lg:hover:cursor-pointer lg:hover:bg-gradient-to-l lg:hover:from-blue-500 lg:hover:to-blue-700">
                            <div className="flex gap-4 ">
                                <Image src={treatmentIcon} className="size-8 lg:size-10" alt="" />
                                <p className="text-2xl lg:text-3xl">Treatments</p>
                            </div>
                            <div className="flex flex-col text-white text-xs gap-2 lg:text-sm">
                                <p>- Create Treatment</p>
                                <p>- Update Treatment</p>
                                <p>- Delete Treatment</p>
                            </div>
                        </Link>

                        <Link href={'/admin/bookings'} className="bg-blue-700 rounded-md p-4 space-y-5 lg:space-y-10 lg:hover:cursor-pointer lg:hover:bg-gradient-to-l lg:hover:from-blue-500 lg:hover:to-blue-700">
                            <div className="flex gap-4 ">
                                <Image src={bookingsIcon} className="size-8 lg:size-10" alt="" />
                                <p className="text-2xl lg:text-3xl">Bookings</p>
                            </div>
                            <div className="flex flex-col text-white text-xs gap-2 lg:text-sm">
                                <p>- View Appointments</p>
                                <p>- Cancel Appointment</p>
                            </div>
                        </Link>

                        <Link href={'/admin/cancellations'} className="bg-blue-700 rounded-md p-4 space-y-5 lg:space-y-10 lg:hover:cursor-pointer lg:hover:bg-gradient-to-l lg:hover:from-blue-500 lg:hover:to-blue-700">
                            <div className="flex gap-4 ">
                                <Image src={requestCancelIcon} className="size-8 lg:size-10" alt="" />
                                <p className="text-2xl lg:text-3xl">Cancellation Requests</p>
                            </div>
                            <div className="flex flex-col text-white text-xs gap-2 lg:text-sm">
                                <p>- View Cancellation requests</p>
                                <p>- Accept Cancellation requests</p>
                                <p>- Reject Cancellation requests</p>
                            </div>
                        </Link>
                    </div>
                </div>


            </div>

        </div>

    )
}