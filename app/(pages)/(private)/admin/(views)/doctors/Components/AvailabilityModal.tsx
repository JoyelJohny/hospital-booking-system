'use client'
import Image from "next/image"
import close from '@/public/close.png'
import doctor from "@/public/doctor.jpg"
import { useEffect, useState } from "react"

type props = {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AvailabilityModal({ closeModal }: props) {
    const [day, setDay] = useState<string>('')

    // initial setting of Day
    useEffect(() => {
        const today = new Date()
        setDay(today.toLocaleDateString('en-US', { weekday: 'long' }))
    }, [])

    // Changing the day when select option is changed
    const selectDayHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDay(e.currentTarget.value)
    }

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center border border-blue-700 bg-white w-11/12 h-96  p-3 rounded-xl space-y-5 overflow-y-hidden">
            <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                    <Image src={doctor} alt="" className="size-20 object-cover object-top rounded-full" />
                    <div>
                        <p className="text-xs">Caridology</p>
                        <p className="font-semibold">Dr Arjun Joseph</p>
                        <p className="text-xs">arjunjoshenph@lksdfs</p>
                    </div>

                </div>
                <Image src={close} alt='' className="size-4 lg:hover:scale-110" onClick={() => closeModal(prev => !prev)} />
            </div>
            <div className="space-y-1">
                <div className="flex justify-between">
                    <p className="text-sm font-semibold">Availabilities List</p>
                    <button className="bg-blue-700 rounded-md text-white text-xs py-1 px-2 ">Add new</button>
                </div>
                <div className="flex gap-2 items-center">
                    <label htmlFor="day" className="text-xs">Select a day</label>
                    <select id="day" className="text-xs font-semibold p-1 border border-blue-700 rounded-md" value={day} onChange={selectDayHandler}>
                        <option value="Sunday" >Sunday</option>
                        <option value="Monday" >Monday</option>
                        <option value="Tuesday" >Tuesday</option>
                        <option value="Wednesday" >Wednesday</option>
                        <option value="Thursday" >Thursday</option>
                        <option value="Friday" >Friday</option>
                        <option value="Saturday" >Saturday</option>
                    </select>
                </div>

            </div>
            <div className="flex flex-col gap-4 overflow-y-scroll max-h-52 ">

                <div className="flex border border-blue-700 rounded-md p-2 text-xs justify-between items-center">
                    <div className="flex gap-4 ">
                        <p className="font-semibold">From</p>
                        <p className="tracking-widest">08:12 AM</p>
                    </div>
                    <div className="flex gap-4">
                        <p className="font-semibold">To</p>
                        <p className="tracking-widest">12:12 PM</p>
                    </div>
                    <button className="w-20 font-semibold bg-blue-700 rounded-md p-1 text-white">Edit</button>
                </div>

            </div>
        </div>
    )
}