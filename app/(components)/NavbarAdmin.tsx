import Image from "next/image"
import logo from "@/public/hospital.png"
export default function NavbarAdmin() {
    return (<>
        <div className="flex bg-[#086788] w-full justify-between">
            <div className="flex p-2 gap-6">
                <Image src={logo}
                    width={64}
                    height={64}
                    alt="Logo of the Hospital booking system" />

                <div className="text-3xl font-bold py-4">Hospital Booking System</div>
            </div>
        </div>
    </>)
}