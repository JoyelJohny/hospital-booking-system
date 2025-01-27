"use client"
import Image from "next/image"
import logo from "@/public/hospital.png"
import menu from "@/public/menu.png"
import reject from "@/public/reject.png"
import Link from "next/link"
import { useState } from "react"
export default function Navbar() {
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
                    <div className="text-xl font-semibold text-nowrap md:text-2xl lg:text-3xl">Holy Memorial Hospital</div>
                    <div className="text-xs font-thin">We Care For You</div>
                </div>


            </div>

            <div className="py-4 lg:hidden">
                <Image src={navbarModal ? reject : menu} alt="Menu icon" className="my-auto size-5 md:size-8" onClick={() => setNavbarModal(!navbarModal)} />
            </div>

            <div className="hidden md:hidden lg:flex items-center justify-center gap-8 text-md xl:gap-16">

                <Link href="/" className="hover:underline hover:text-blue-700">Home</Link>
                <Link href="/doctors" className="hover:underline hover:text-blue-700">Doctors</Link>
                <Link href="/treatments" className="hover:underline hover:text-blue-700">Treatments</Link>
                <Link href="/bookings/new" className="hover:underline hover:text-blue-700">Request an Appointment</Link>

            </div>
            {navbarModal && (

                <div className={`absolute flex flex-col justify-around w-screen h-72 right-0 top-16 bg-blue-600 rounded-b-xl py-2 px-4 text-white md:top-24 lg:hidden`}>
                    <span>Home</span>
                    <hr />
                    <span>Doctors</span>
                    <hr />
                    <span>Treatments</span>
                    <hr />
                    <span>Request an Appointment</span>
                </div>

            )}

        </div>
    </>)
}