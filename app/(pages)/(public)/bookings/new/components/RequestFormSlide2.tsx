import back from "@/public/back.png"
import Image from "next/image";
import doctor from "@/public/doctor.jpg";
type props = {
    prevModal: React.Dispatch<React.SetStateAction<boolean>>,
    currentModal: React.Dispatch<React.SetStateAction<boolean>>,
    nextModal: React.Dispatch<React.SetStateAction<boolean>>,
}
export default function RequestFormSlide2({ prevModal, currentModal, nextModal }: props) {
    const handlePrevButton = () => {
        currentModal(prev => !prev)
        prevModal(prev => !prev)
    }
    const handleNextButton = () => {
        currentModal(prev => !prev)
        nextModal(prev => !prev)
    }
    return (
        <div className=" h-full overflow-hidden">
            <div className="flex  items-center">
                <Image src={back} alt="" className="size-4 hover:cursor-pointer" onClick={handlePrevButton} />
                <p className="font-semibold w-full  text-center">Select Appointment</p>
                <Image src={back} alt="" className="size-4 rotate-180 hover:cursor-pointer" onClick={handleNextButton} />
            </div>
            <div className="flex flex-col h-full">
                <div className="pt-5 pb-5 space-y-4">
                    <p className="text-center">No slots available on this date</p>
                    <p className="font-semibold">Other Available Dates</p>
                </div>
                <div className="grid grid-cols-1 gap-2 overflow-y-scroll pb-8">
                    <div className="flex p-1 gap-2 border border-blue-700 rounded-md items-center">
                        <Image src={doctor} alt="" className="object-cover object-top rounded-full size-16" />
                        <div className="flex flex-grow flex-col p-1  justify-between">
                            <div className="flex flex-col justify-between gap-1">
                                <p className="font-semibold text-sm">Dr Arun Joseph</p>
                                <p className="font-semibold text-xs">Date <span className="font-normal">19-12-2020</span></p>
                            </div>
                            <div className="flex justify-between text-xs items-center">
                                <p className="font-semibold">Timings <span className="font-normal">11:00 AM</span> - <span className="font-normal">12:00 PM</span></p>
                                <button className="w-fit py-1 px-4 bg-blue-700 rounded-md text-white text-sm">Book</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex p-1 gap-2 border border-blue-700 rounded-md items-center">
                        <Image src={doctor} alt="" className="object-cover object-top rounded-full size-16" />
                        <div className="flex flex-grow flex-col p-1  justify-between">
                            <div className="flex flex-col justify-between gap-1">
                                <p className="font-semibold text-sm">Dr Arun Joseph</p>
                                <p className="font-semibold text-xs">Date <span className="font-normal">19-12-2020</span></p>
                            </div>
                            <div className="flex justify-between text-xs items-center">
                                <p className="font-semibold">Timings <span className="font-normal">11:00 AM</span> - <span className="font-normal">12:00 PM</span></p>
                                <button className="w-fit py-1 px-4 bg-blue-700 rounded-md text-white text-sm">Book</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex p-1 gap-2 border border-blue-700 rounded-md items-center">
                        <Image src={doctor} alt="" className="object-cover object-top rounded-full size-16" />
                        <div className="flex flex-grow flex-col p-1  justify-between">
                            <div className="flex flex-col justify-between gap-1">
                                <p className="font-semibold text-sm">Dr Arun Joseph</p>
                                <p className="font-semibold text-xs">Date <span className="font-normal">19-12-2020</span></p>
                            </div>
                            <div className="flex justify-between text-xs items-center">
                                <p className="font-semibold">Timings <span className="font-normal">11:00 AM</span> - <span className="font-normal">12:00 PM</span></p>
                                <button className="w-fit py-1 px-4 bg-blue-700 rounded-md text-white text-sm">Book</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex p-1 gap-2 border border-blue-700 rounded-md items-center">
                        <Image src={doctor} alt="" className="object-cover object-top rounded-full size-16" />
                        <div className="flex flex-grow flex-col p-1  justify-between">
                            <div className="flex flex-col justify-between gap-1">
                                <p className="font-semibold text-sm">Dr Arun Joseph</p>
                                <p className="font-semibold text-xs">Date <span className="font-normal">19-12-2020</span></p>
                            </div>
                            <div className="flex justify-between text-xs items-center">
                                <p className="font-semibold">Timings <span className="font-normal">11:00 AM</span> - <span className="font-normal">12:00 PM</span></p>
                                <button className="w-fit py-1 px-4 bg-blue-700 rounded-md text-white text-sm">Book</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex p-1 gap-2 border border-blue-700 rounded-md items-center">
                        <Image src={doctor} alt="" className="object-cover object-top rounded-full size-16" />
                        <div className="flex flex-grow flex-col p-1  justify-between">
                            <div className="flex flex-col justify-between gap-1">
                                <p className="font-semibold text-sm">Dr Arun Joseph</p>
                                <p className="font-semibold text-xs">Date <span className="font-normal">19-12-2020</span></p>
                            </div>
                            <div className="flex justify-between text-xs items-center">
                                <p className="font-semibold">Timings <span className="font-normal">11:00 AM</span> - <span className="font-normal">12:00 PM</span></p>
                                <button className="w-fit py-1 px-4 bg-blue-700 rounded-md text-white text-sm">Book</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex p-1 gap-2 border border-blue-700 rounded-md items-center">
                        <Image src={doctor} alt="" className="object-cover object-top rounded-full size-16" />
                        <div className="flex flex-grow flex-col p-1  justify-between">
                            <div className="flex flex-col justify-between gap-1">
                                <p className="font-semibold text-sm">Dr Arun Joseph</p>
                                <p className="font-semibold text-xs">Date <span className="font-normal">19-12-2020</span></p>
                            </div>
                            <div className="flex justify-between text-xs items-center">
                                <p className="font-semibold">Timings <span className="font-normal">11:00 AM</span> - <span className="font-normal">12:00 PM</span></p>
                                <button className="w-fit py-1 px-4 bg-blue-700 rounded-md text-white text-sm">Book</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="flex flex-col text-xs gap-10">
                    <div className="flex  gap-4 items-center">
                        <label htmlFor="">Choose your Treatment</label>
                        <select name="" id="" className="border p-1 rounded-md border-blue-700">
                            <option value="Cardiology">Cardiology</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <p>Pick a Date</p>
                    </div>
                </div> */}
            </div>

        </div>
    )
}