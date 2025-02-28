'use client'
import Image from "next/image"
import close from '@/public/close.png'
import doctor from "@/public/doctor.jpg"
import settings from '@/public/settings.png'
import deleteIcon from '@/public/bin.png'
import { useEffect, useState } from "react"

type Availability = {
    _id: string,
    doctorId: string
    dayOfWeek: string,
    startTime: string,
    endTime: string,
    slotDuration: number,
    bufferTime: number,
}
type props = {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>
    createSlotModal: React.Dispatch<React.SetStateAction<boolean>>
    updateSlotModal: (data: any) => void
    slotsData: Availability[] | undefined
}

export default function AvailabilityModal({ closeModal, createSlotModal, updateSlotModal, slotsData }: props) {
    const [fromDate, setFromDate] = useState<string>(new Date().toLocaleDateString('en-CA'))
    const [toDate, setToDate] = useState<string>(fromDate)
    const [day, setDay] = useState<string>('')
    const [settingsModal, setSettingsModal] = useState(false)

    // initial setting of Day
    useEffect(() => {
        const today = new Date()
        setDay(today.toLocaleDateString('en-US', { weekday: 'long' }))
    }, [])

    const getFromDate = (date: string) => {
        console.log(fromDate)
        setFromDate(date)
        const d1 = new Date(date)
        const d2 = new Date(toDate)

        if (d1 > d2) {
            setToDate(date)
        }

    }

    const getToDate = (date: string) => {
        setToDate(date)
    }
    // Changing the day when select option is changed
    const selectDayHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDay(e.currentTarget.value)
    }

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center border border-slate-800 bg-white w-11/12 min-h-[450px]  p-3 rounded-xl space-y-5 overflow-y-hidden">
            <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                    <Image src={doctor} alt="" className="size-20 object-cover object-top rounded-full" />
                    <div>
                        <p className="text-xs">Caridology</p>
                        <p className="font-semibold">Dr Arjun Joseph</p>
                        <p className="text-xs">arjunjoshenph@lksdfs</p>
                    </div>

                </div>
                <Image src={close} alt='' className="size-4 lg:hover:scale-110 hover:cursor-pointer" onClick={() => closeModal(prev => !prev)} />
            </div>


            {!settingsModal && <div className="space-y-5">
                <div className="space-y-1">
                    <div className="flex justify-between">
                        <p className="text-sm font-semibold">Availabilities List</p>
                        <div className="flex gap-2 items-center">
                            <button className="bg-slate-800 rounded-md text-white text-xs py-1 px-2 " onClick={() => createSlotModal(prev => !prev)}>Add new</button>
                            <Image src={settings} className="size-4 hover:cursor-pointer" alt="" onClick={() => setSettingsModal(prev => !prev)} />
                        </div>

                    </div>
                    <div className="flex gap-2 items-center">
                        <label htmlFor="day" className="text-xs">Select a day</label>
                        <select id="day" className="text-xs font-semibold p-1 border border-slate-800 rounded-md" value={day} onChange={selectDayHandler}>
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
                    {slotsData != null ? slotsData.filter(slot => day == slot.dayOfWeek).map((slot) =>
                        <div key={slot._id} className="flex border border-slate-800 rounded-md p-2 text-xs justify-between items-center">
                            <div className="flex gap-2 ">
                                <p className="font-semibold">From</p>
                                <p className="tracking-widest">{slot.startTime}</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="font-semibold">To</p>
                                <p className="tracking-widest">{slot.endTime}</p>
                            </div>
                            <button className="w-fit font-semibold bg-slate-800 rounded-md p-1 text-white" onClick={() => updateSlotModal(slot)}>Edit</button>
                            <button className='flex items-center py-1 px-1 bg-slate-800 rounded-md'>
                                <Image src={deleteIcon} alt='' className='size-4' />
                            </button>
                        </div>
                    ) : 'hello'}


                </div>
            </div>}

            {settingsModal && <div className="space-y-10 ">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold">Settings</p>
                    <Image src={settings} className="size-4 hover:cursor-pointer" onClick={() => setSettingsModal(prev => !prev)} alt="" />
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex text-sm items-center">
                        <span className="w-96">From</span>
                        <input type="date" value={fromDate} onChange={(e) => getFromDate(e.currentTarget.value)} min={new Date().toLocaleDateString('en-CA')} className="p-1 text-xs focus:outline-none border border-slate-800 w-full rounded-md" />
                    </div>
                    <div className="flex text-sm items-center">
                        <span className=" w-96">To</span>
                        <input type="date" value={toDate} onChange={(e) => getToDate(e.currentTarget.value)} min={fromDate} className="p-1 text-xs focus:outline-none border border-slate-800 w-full rounded-md" />
                    </div>
                    <div className="flex text-sm items-center">
                        <span className="text-nowrap w-96">Default Buffer Time</span>
                        <input type="number" className="p-1 text-xs focus:outline-none border border-slate-800 w-full rounded-md" />
                    </div>
                    <div className="flex text-sm items-center">
                        <span className="text-nowrap w-96">Default Slot Duration</span>
                        <input type="text" className="p-1 text-xs focus:outline-none border border-slate-800 w-full rounded-md" />
                    </div>
                    <button className="px-4 py-1 text-xs text-white bg-slate-800 text-center rounded-md">Save Settings</button>
                    <button className="px-4 py-1 text-xs border  border-slate-800 text-center rounded-md" onClick={() => setSettingsModal(prev => !prev)}>Discard</button>
                </div>
            </div>}
        </div>
    )
}