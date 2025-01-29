import Image from "next/image";
import doctorIcon from "@/public/doctors.png"
import treatmentIcon from "@/public/treatments.png"
import bookingsIcon from "@/public/appointment.png"
import requestCancelIcon from "@/public/wrong-time.png"
import Link from "next/link";

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-2 px-5 py-5 h-full xl:px-32">
            <div className="text-xs">&gt; <Link href="/admin/dashboard" className="text-blue-700">Home</Link></div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 text-white h-full">
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
    )
}