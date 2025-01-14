import Image from "next/image"
import logo from "@/public/hospital.png"
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
                <button className="px-6 rounded-xl border-transparent hover:bg-green-400">Home</button>
                <button className="px-6 rounded-xl border-transparent hover:bg-green-400">Treatments</button>
                <button className="px-6 rounded-xl border-transparent hover:bg-green-400">Book appointment</button>
                <button className="px-6 rounded-xl border-transparent hover:bg-green-400">Cancel appointment</button>


                {/* <div>Treatments</div>
                <div>Book appointment</div>
                <div>Cancel appointment</div> */}

            </div>
        </div>
    </>)
}