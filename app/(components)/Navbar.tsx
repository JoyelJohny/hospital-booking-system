import Image from "next/image"
import logo from "@/public/hospital.png"
import Link from "next/link"
export default function Navbar() {
    return (<>
        <div className="flex bg-[#086788] w-full justify-between">
            <div className="flex p-2 gap-6">
                <Image src={logo}
                    width={64}
                    height={64}
                    alt="Logo of the Hospital booking system" />

                <div className="text-3xl font-bold py-4">Hospital Booking System</div>
            </div>

            <div className="flex py-4 px-4 space-x-4 text-lg font-semibold">
                <Link href="/" className="px-6 pt-3 rounded-xl hover:bg-green-400">Home</Link>
                <Link href="/treatments" className="px-6 pt-3 rounded-xl hover:bg-green-400">Treatments</Link>
                <Link href="/bookings/cancel-request" className="px-6 pt-3 rounded-xl hover:bg-green-400">Cancel appointment</Link>
            </div>
        </div>
    </>)
}