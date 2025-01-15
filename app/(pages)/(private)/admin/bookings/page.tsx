import Image from "next/image"
import accept from "@/public/accept.png"
import reject from "@/public/reject.png"


export default function Booking() {
    return (<>
        <div className=" px-40 py-10 ">

            <div className="flex text-black p-6 justify-between gap-10">
                <h2 className=" w-full text-2xl font-semibold text-center">Bookings Pending</h2>
                <h2 className="w-full text-2xl font-semibold text-center">Bookings Rejected</h2>
            </div>

            <div className="grid grid-cols-2 gap-10 w-full h-full place-content-center ">

                <div className="grid grid-row-* gap-2">


                    <div className="flex flex-col bg-[#086788] p-6 h-16 justify-center rounded-xl hover:scale-105 hover:cursor-pointer drop-shadow-xl" >
                        <div className="flex justify-between">
                            <button className="text-2xl px-2 py-1 rounded-lg font-semibold hover:bg-green-400 hover:border-transparent">Hbs12423432</button>


                            <button className="w-10 h-10 hover:bg-red-400 p-2 rounded-xl"><Image src={reject} width={24} height={24} alt="delete button image" /></button>

                        </div>

                    </div>


                </div>
                <div className="grid grid-row-* gap-2 ">


                    <button className="bg-red-500 rounded-xl h-16 text-xl font-semibold px-6 text-start hover:scale-105">HBS123124</button>

                    {/* <div className="flex flex-col bg-[#086788] p-6 justify-center rounded-3xl ">

                        <button className="text-2xl px-2 py-1 rounded-lg font-semibold hover:bg-green-400 hover:border-transparent">Hbs12423432</button>


                    </div> */}

                </div>







            </div>
        </div>
    </>)
}