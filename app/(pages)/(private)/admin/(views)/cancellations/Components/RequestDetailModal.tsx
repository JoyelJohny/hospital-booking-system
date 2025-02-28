
import Image from "next/image";
import cancelIcon from '@/public/wrong.png'

type props = {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>

}
export default function RequestDetailModal({ closeModal }: props) {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center border border-slate-800 bg-white w-11/12 min-h-[450px]  p-3 rounded-xl space-y-4 overflow-y-hidden">
            <div className="flex justify-between">
                <h1 className=" text-lg font-semib `    ~       `   old text-center">Appointment Details</h1>
                <button className=" w-7 h-7  p-2  rounded-lg text-white bg-slate-800 hover:bg-red-400" onClick={() => closeModal(prev => !prev)}>
                    <Image src={cancelIcon} alt="" />
                </button>
            </div>
            <div className="grid grid-cols-1 gap-x-2 gap-y-1 text-xs">
                <div className=" flex gap-4 "><div className=" font-semibold  w-24 text-nowrap ">ID</div><div className=""> HBS123423</div></div>
                <div className=" flex gap-4 "><div className=" font-semibold  w-24 text-nowrap ">Consultation By</div><div className=""> Dr. Arun Joseph</div></div>
                <div className=" flex gap-4 "><div className=" font-semibold  w-24">Treatment</div><div className=""> Cardiology</div></div>
                <div className=" flex gap-4 "><div className=" font-semibold  w-24">Date</div><div className=""> 2025-03-12</div></div>
                <div className=" flex gap-4 "><div className=" font-semibold  w-24">Timings</div><div className=""> 12:00 AM - 13:00 PM</div></div>
            </div>
            <h2 className="mt-8 font-semibold text-sm">Patient Details</h2>


            <div className="grid grid-cols-1 gap-x-2 gap-y-2 text-xs">
                <div className=" flex gap-4 "><div className=" font-semibold  w-24">Name</div><div className="">Ajay Dev</div></div>
                <div className=" flex gap-4 "><div className=" font-semibold w-24">Gender</div><div className="">Male</div></div>
                <div className=" flex gap-4 "><div className=" font-semibold  w-24">Age</div><div className="">21</div></div>
                <div className=" flex gap-4 "><div className=" font-semibold  w-24">DOB</div><div className="">2001-04-12</div></div>
                <div className=" flex gap-4 "><div className=" font-semibold  w-24">Phone</div><div className="">+91-1234123412</div></div>
                <div className=" flex gap-4 "><div className=" font-semibold  w-24">Email</div><div className="">ajaydev@gmail.com</div></div>
                <div className=" flex gap-4 "><div className=" font-semibold  w-24">Status</div><div className="">Accepted</div></div>


            </div>
            <div className=" flex gap-4 my-3 "><div className=" font-semibold text-xs w-20 py-2">Description</div><textarea readOnly className="w-full border p-1 h-10 rounded-md border-slate-800 focus:outline-none"></textarea></div>
            <div className="flex">
                <button className="rounded-md w-full px-4 py-2 text-sm font-semibold bg-slate-800 text-white">Reject Appointment</button>
            </div>
        </div>
    )
}