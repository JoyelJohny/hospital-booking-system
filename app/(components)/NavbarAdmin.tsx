"use client"
import Image from "next/image"
import Link from "next/link"

//mobile navbar images
import dashboardIcon from '@/public/home.png'
import doctorIcon from '@/public/doctors.png'
import treatmentIcon from "@/public/treatments.png"
import bookingsIcon from '@/public/appointment.png'
import cancellation_requestIcon from "@/public/wrong-time.png"
import userIcon from '@/public/user.png'

export default function NavbarAdmin({ className }: { className: string }) {

    return (
        <div className={`${className} fixed bottom-0 p-1 rounded-t-xl bg-slate-800 w-screen lg:static lg:px-3 lg:py-5 lg:overflow-hidden`}>

            <div className="hidden lg:flex mb-5 text-white text-md font-semibold text-nowrap w-fit p-2">Holy Memorial Hospital</div>

            <div className="flex gap-7 px-2 py-1 items-center overflow-x-scroll md:justify-between md:gap-0 lg:flex-col lg:h-96 lg:justify-normal lg:space-y-2 lg:overflow-visible">

                <Link href="/admin/dashboard" className="flex flex-col gap-1 items-center lg:flex-row lg:gap-4 lg:w-full lg:p-2 lg:hover:bg-slate-400 lg:rounded-md ">
                    <Image src={dashboardIcon} alt="" className="size-5" />
                    <span className="text-white text-xs lg:text-sm">Home</span>
                </Link>

                <Link href="/admin/doctors" className="flex flex-col gap-1 items-center lg:flex-row lg:gap-4 lg:w-full lg:p-2 lg:hover:bg-slate-400 lg:rounded-md ">
                    <Image src={doctorIcon} alt="" className="size-5" />
                    <span className="text-white text-xs lg:text-sm">Doctors</span>
                </Link>

                <Link href="/admin/treatments" className="flex flex-col gap-1 items-center lg:flex-row lg:gap-4 lg:w-full lg:p-2 lg:hover:bg-slate-400 lg:rounded-md ">
                    <Image src={treatmentIcon} alt="" className="size-5" />
                    <span className="text-white text-xs lg:text-sm">Treatments</span>
                </Link>

                <Link href="/admin/bookings" className="flex flex-col gap-1 items-center lg:flex-row lg:gap-4 lg:w-full lg:p-2 lg:hover:bg-slate-400 lg:rounded-md ">
                    <Image src={bookingsIcon} alt="" className="size-5" />
                    <span className="text-white text-xs lg:text-sm">Bookings</span>
                </Link>

                <Link href="/admin/cancellations" className="flex flex-col gap-0.5 items-center lg:flex-row lg:gap-3 lg:w-full lg:p-2 lg:hover:bg-slate-400 lg:rounded-md ">
                    <Image src={cancellation_requestIcon} alt="" className="size-6" />
                    <span className="text-white text-xs text-nowrap lg:text-sm">Cancel Requests</span>
                </Link>

                <Link href="/admin/account" className="flex flex-col items-center lg:flex-row lg:gap-3 lg:w-full lg:p-2 lg:hover:bg-slate-400 lg:rounded-md ">
                    <Image src={userIcon} alt="" className="size-6" />
                    <span className="text-white text-xs lg:text-sm">Account</span>
                </Link>

            </div>

        </div>
    )
}