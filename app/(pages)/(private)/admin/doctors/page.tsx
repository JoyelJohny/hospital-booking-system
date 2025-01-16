"use client"

import Image from "next/image"
import create from "@/public/write.png"
import edit from "@/public/edit-text.png"
import bin from "@/public/bin.png"
import Form from "next/form"
import DividerComponent from "@/app/(components)/DividerComponent"
import { useEffect, useState } from "react"

interface Doctor {
    _id: string,
    name: string,
    specialization: string,
    contact: string
}

export default function Doctor() {
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [createModal, setCreateModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [availabilityModal, setAvailibilityModal] = useState(false)
    const [selectedDay, setSelectedDay] = useState("")

    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch("http://localhost:3000/api/v1/private/doctors", { method: "GET" })
                const result = await res.json()

                setDoctors(result)
            } catch (error) {

            }
        }
        getData()
    }, [])

    const handleDayButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        const val = e.currentTarget.value
        setSelectedDay(val)
    }

    const han = () => {
        console.log("hello")
    }

    return (<>
        <div className="px-40 py-10 border-2">
            <div className="grid grid-cols-3 gap-10 w-full h-full place-content-center ">

                {doctors.map((doctor) => (
                    <div key={doctor._id} className="flex flex-col bg-[#086788] p-5 justify-center rounded-3xl ">
                        <div className="flex justify-between">
                            <h2 className="text-2xl py-1 font-semibold">{doctor.name}</h2>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 hover:bg-green-400 p-2 rounded-xl" onClick={() => setUpdateModal(!updateModal)}><Image src={edit} width={24} height={24} alt="edit button image" /></button>
                                <button className="w-10 h-10 hover:bg-red-400 p-2 rounded-xl"><Image src={bin} width={24} height={24} alt="delete button image" /></button>
                            </div>
                        </div>
                        <div className="flex justify-between py-1">
                            <div>
                                <p className="text-sm">{doctor.specialization}</p>
                                <p className="text-xs">{doctor.contact}</p>
                            </div>

                            <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent" onClick={() => setAvailibilityModal(!availabilityModal)}>Set availability</button>
                        </div>


                    </div>))}



            </div>

            {/* Doctor updation Form*/}

            {updateModal && (<Form action={han} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center bg-black p-6 rounded-lg space-y-5">
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Dr Name</label>
                    <input type="text" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Treatment</label>
                    <input type="text" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Contact</label>
                    <input type="text" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-around gap-2">
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent">Update</button>
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-red-400 hover:border-transparent" onClick={() => setUpdateModal(!updateModal)}>Cancel</button>
                </div>
            </Form>)}


            {/* Doctor creation Form*/}

            {createModal && (<Form action={han} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center bg-black p-6 rounded-lg space-y-5">
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Dr Name</label>
                    <input type="text" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Treatment</label>
                    <input type="text" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Treatment ID</label>
                    <input type="text" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Contact</label>
                    <input type="text" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-around gap-2">
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent">Create</button>
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-red-400 hover:border-transparent" onClick={() => setCreateModal(!createModal)}>Cancel</button>
                </div>
            </Form>)}


            {availabilityModal && (<Form action={han} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-6 text-[#086788] border-4 border-[#086788] rounded-xl">
                <div className="rounded-xl px-6 py-4 bg-[#086788] border-2 text-gray-100">
                    <p className="text-2xl font-bold">Dr John Doe </p>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm">Cardiology</p>
                            <p className="text-xs">johndoe@gmail.com</p>
                        </div>

                    </div>
                </div>
                <h1>Availability</h1>
                <DividerComponent />
                <h1>Add new</h1>

                <div className="flex justify-between">
                    <p className="font-semibold">Select the day</p>
                    <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Sunday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Sunday" onClick={handleDayButton}>Sunday</button>
                    <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Monday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Monday" onClick={handleDayButton}>Monday</button>
                    <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Tuesday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Tuesday" onClick={handleDayButton}>Tuesday</button>
                    <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Wednesday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Wednesday" onClick={handleDayButton}>Wednesday</button>
                    <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Thursday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Thursday" onClick={handleDayButton}>Thursday</button>
                    <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Friday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Friday" onClick={handleDayButton}>Friday</button>
                    <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Saturday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Saturday" onClick={handleDayButton}>Saturday</button>

                </div>

                <div className="grid grid-cols-4 gap-4 py-6">
                    <label htmlFor="" className="py-1 font-semibold">Start time</label><input type="time" className=" border-2 border-[#086788] rounded-md p-1" />
                    <label htmlFor="" className="py-1 font-semibold">End time</label><input type="time" className=" border-2 border-[#086788] rounded-md p-1" />
                    <label htmlFor="" className="py-1 font-semibold">Slot Duration (in Min)</label><input type="Number" min="5" max="90" className=" border-2 border-[#086788] rounded-md p-1" />
                    <label htmlFor="" className="py-1 font-semibold">Buffer Time (in Min)</label><input type="Number" min="5" max="30" className=" border-2 border-[#086788] rounded-md p-1" />
                </div>


                <button type="submit" className="rounded-md  px-4 py-2 my-4 border-2 border-white text-2xl font-semibold hover:bg-green-400 hover:border-transparent">Add</button>
                <DividerComponent />

            </Form>)}


            <button className="bg-white w-20 h-20 fixed bottom-20 right-20 rounded-full p-5 shadow-md shadow-black" onClick={() => setCreateModal(!createModal)}>
                <Image src={create} width={64} height={64} className="text-white" alt="create button image" />
            </button>
        </div>
    </>)
}