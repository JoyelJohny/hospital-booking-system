"use client"
import Image from "next/image"
import logo from "@/public/hospital.png"
import menu from "@/public/menu.png"
import reject from "@/public/reject.png"
import Link from "next/link"
import { useState } from "react"
export default function NavbarAdmin() {
    const [navbarModal, setNavbarModal] = useState(false)


    return (<>
        <div className="flex bg-white w-screen justify-between py-2 px-4 drop-shadow-xl md:py-4 lg:px-10 xl:px-32">
            <div className="flex gap-2 items-center justify-start md:gap-4 ">
                <div className="flex ">
                    <Image src={logo}
                        className="size-10 md:size-16"
                        alt="Logo of the Hospital booking system" />
                </div>


                <div className="flex flex-col ">
                    <div className="text-xl font-semibold text-nowrap md:text-2xl lg:text-2xl xl:text-3xl">Holy Memorial Hospital</div>
                    <div className="text-xs font-thin">We Care For You</div>
                </div>


            </div>

            <div className="py-4 lg:hidden">
                <Image src={navbarModal ? reject : menu} alt="Menu icon" className="my-auto size-5 md:size-8" onClick={() => setNavbarModal(!navbarModal)} />
            </div>

            <div className="hidden md:hidden lg:flex items-center justify-center gap-8 text-md lg:gap-4 xl:gap-10">

                <Link href="/admin/dashboard" className="hover:underline hover:text-blue-700">Home</Link>
                <Link href="/admin/doctors" className="hover:underline hover:text-blue-700">Doctors</Link>
                <Link href="/admin/treatments" className="hover:underline hover:text-blue-700">Treatments</Link>
                <Link href="/admin/bookings" className="hover:underline hover:text-blue-700">Bookings</Link>
                <Link href="/admin/cancellations" className="hover:underline hover:text-blue-700 text-nowrap" >Cancellation Requests</Link>
                <Link href="/admin" className="hover:underline hover:text-blue-700">Logout</Link>

            </div>
            {navbarModal && (

                <div className={`absolute flex flex-col justify-around w-screen h-72 right-0 top-16 bg-blue-600 rounded-b-xl py-2 px-4 text-white md:top-24 lg:hidden`}>
                    <Link href="/admin/dashboard" onClick={() => { setNavbarModal(!navbarModal) }}>Home</Link>
                    <hr />
                    <Link href="/admin/doctors" onClick={() => { setNavbarModal(!navbarModal) }}>Doctors</Link>
                    <hr />
                    <Link href="/admin/treatments" onClick={() => { setNavbarModal(!navbarModal) }}>Treatments</Link>
                    <hr />
                    <Link href="/admin/bookings" onClick={() => { setNavbarModal(!navbarModal) }}>Bookings</Link>
                    <hr />
                    <Link href="/admin/cancellations" onClick={() => { setNavbarModal(!navbarModal) }}>Cancellation Requests</Link>
                    <hr />
                    <Link href="/admin" onClick={() => { setNavbarModal(!navbarModal) }}>Logout</Link>
                </div>

            )}

        </div>
    </>)
}