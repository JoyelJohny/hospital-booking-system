"use client"

import Image from "next/image"
import create from "@/public/write.png"
import edit from "@/public/edit-text.png"
import bin from "@/public/bin.png"
import reject from "@/public/reject.png"
import Form from "next/form"
import DividerComponent from "@/app/(components)/DividerComponent"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Logout from "@/app/(components)/LogoutComponent"


interface Doctor {
    _id: string,
    name: string,
    specialization: string,
    contact: string
}

type treatment = { _id: string, name: string }

export default function Doctor() {
    const router = useRouter()
    const [token, setToken] = useState<string | null>(null)

    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [treatments, setTreatments] = useState<treatment[]>([])
    const [selectedDoctorDetail, setSelectedDoctorDetail] = useState<Doctor>({ _id: '', name: '', specialization: '', contact: '' })
    const [createDoctorModal, setCreateDoctorModal] = useState(false)
    const [updateDoctorModal, setUpdateDoctorModal] = useState(false)
    const [availabilityModal, setAvailibilityModal] = useState(false)
    const [createAvailabilityModal, setCreateAvailabilityModal] = useState(false)
    const [updateAvailabilityModal, setUpdateAvailabilityModal] = useState(false)
    const [selectedDay, setSelectedDay] = useState("")


    useEffect(() => {
        // Fetch token directly from localStorage and set it
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            // Redirect to login if no token exists
            router.push('/login');
        } else {
            setToken(storedToken); // Set the token
        }
    }, [router]); // Run only once on component mount

    useEffect(() => {
        if (token) {
            getDoctorsData();
        }
    }, [token]);

    const getDoctorsData = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/v1/private/doctors", { method: "GET", headers: { auth: `Bearer ${token}` } })
            const { doctors, treatments } = await res.json()
            if (!res.ok) {
                console.log(res)
                // router.back()

            } else {
                setTreatments(treatments)
                setDoctors(doctors)
                console.log(treatments, doctors)
            }


        } catch (error) {

        }
    }

    const handleDayButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        const val = e.currentTarget.value
        setSelectedDay(val)
    }

    const han = () => {
        console.log("hello")
    }
    const handleCreateButton = async (formdata: FormData) => {
        setCreateDoctorModal(!createDoctorModal)
        const data = JSON.stringify(Object.fromEntries(formdata))
        try {
            const res = await fetch('http://localhost:3000/api/v1/private/doctors', { method: "POST", body: data, headers: { auth: `Bearer ${token}` } })
            const result = await res.json()
            console.log(result)
            getDoctorsData()
        } catch (error) {

        }
    }

    const num = [1, 2, 3, 4, 5, 6]
    const handleEdit = (d: Doctor) => {
        setUpdateDoctorModal(!updateDoctorModal)
        setSelectedDoctorDetail(d)
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setSelectedDoctorDetail((prev) => ({ ...prev, [name]: value }))
    }

    const handleDeleteButton = async (id: string) => {
        try {
            console.log(id)
            const res = await fetch(`http://localhost:3000/api/v1/private/doctors/${id}`, { method: "DELETE", headers: { auth: `Bearer ${token}` } })
            const result = await res.json()
            console.log(result)
            getDoctorsData()
        } catch (error) {

        }
    }


    return (<>
        <div className="px-40 py-10 ">
            {!doctors && (<div className="text-black text-center">No doctor created</div>)}
            <div className="grid grid-cols-3 gap-10 w-full h-full place-content-center ">

                {Array.isArray(doctors) && doctors.map((doctor) => (
                    <div key={doctor._id} className="flex flex-col bg-[#086788] p-5 justify-center rounded-3xl ">
                        <div className="flex justify-between">
                            <h2 className="text-2xl py-1 font-semibold">{doctor.name}</h2>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 hover:bg-green-400 p-2 rounded-xl" onClick={() => handleEdit(doctor)}><Image src={edit} width={24} height={24} alt="edit button image" /></button>
                                <button className="w-10 h-10 hover:bg-red-400 p-2 rounded-xl" onClick={() => handleDeleteButton(doctor._id)}><Image src={bin} width={24} height={24} alt="delete button image" /></button>
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

            {updateDoctorModal && (<Form action={han} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center bg-black p-6 rounded-lg space-y-5">
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Dr Name</label>
                    <input type="text" name="name" value={selectedDoctorDetail.name} onChange={handleEditChange} className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Specialization</label>
                    <input type="text" name="contact" value={selectedDoctorDetail.specialization} onChange={handleEditChange} className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm text-nowrap">Treatment Name</label>
                    <select name="treatmentId" id="" className="w-full text-black p-2 rounded-md focus:outline-slate-500">
                        {treatments && treatments.map((treatment) => (<option key={treatment._id} className="text-black" value={treatment.name} >{treatment.name}</option>))}
                    </select>
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Contact</label>
                    <input type="text" name="contact" value={selectedDoctorDetail.contact} onChange={handleEditChange} className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-around gap-2">
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent">Update</button>
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-red-400 hover:border-transparent" onClick={() => setUpdateDoctorModal(!updateDoctorModal)}>Cancel</button>
                </div>
            </Form>)}


            {/* Doctor creation Form*/}

            {createDoctorModal && (<Form action={handleCreateButton} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center bg-black p-6 rounded-lg space-y-5">
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Dr Name</label>
                    <input type="text" name="name" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Specialization</label>
                    <input type="text" name="specialization" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm text-nowrap">Treatment Name</label>
                    <select name="treatmentId" id="" className="w-full text-black p-2 rounded-md focus:outline-slate-500">
                        {treatments && treatments.map((treatment) => (<option key={treatment._id} className="text-black" value={treatment._id} >{treatment.name}</option>))}
                    </select>
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Contact</label>
                    <input type="text" name="contact" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-around gap-2">
                    <button type="submit" className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent">Create</button>
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-red-400 hover:border-transparent" onClick={() => setCreateDoctorModal(!createDoctorModal)}>Cancel</button>
                </div>
            </Form>)}


            {availabilityModal && (
                <Form action={han} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-3 text-[#086788] border-4 border-[#086788] rounded-xl w-2/3">
                    <button className="flex justify-self-end p-1 mb-2 rounded-lg text-white bg-[#086788] hover:bg-red-400" onClick={() => setAvailibilityModal(!availabilityModal)}><Image src={reject} width={24} height={24} alt="close the availability modal" /></button>
                    <div><div className="rounded-xl px-5 py-3 bg-[#086788] border-2 text-gray-100">
                        <p className="text-xl font-bold">Dr John Doe </p>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-xs">Cardiology</p>
                                <p className="text-xs">johndoe@gmail.com</p>
                            </div>

                        </div>
                    </div>

                        <DividerComponent />



                        <div className="flex mb-4 justify-between"><h1 className="px-4  text-2xl font-semibold">Schedule</h1><button className="hover:bg-green-400 hover:text-white rounded-md  px-2 border-2 border-[#086788]" onClick={() => setCreateAvailabilityModal(!createAvailabilityModal)}>Add New</button></div>

                        <div className="flex overflow-x-scroll border-2  rounded-xl border-[#086788]">


                            <table className="border-collapse border-1 ">

                                <tbody>
                                    <tr className="text-center">
                                        <th className="border p-2 border-[#086788] ">Sunday</th>
                                        {num.map((i) => (<td className="border p-2 border-[#086788] text-sm font-semibold"><button title="Click to edit" className="hover:bg-green-400 hover:text-white rounded-md p-1 text-nowrap" onClick={() => setUpdateAvailabilityModal(!updateAvailabilityModal)}>10:00 am - 09:00 pm</button></td>))}

                                    </tr>
                                    <tr>
                                        <th className="border border-[#086788]">Monday</th>
                                        <td className="border p-2 border-[#086788] text-sm font-semibold"><button title="Click to edit" className="hover:bg-green-400 hover:text-white rounded-md p-1">10:00 am - 09:00 pm</button></td>
                                    </tr>
                                    <tr>
                                        <th className="border border-[#086788]">Tuesday</th>
                                        <td className="border p-2 border-[#086788] text-sm font-semibold"><button title="Click to edit" className="hover:bg-green-400 hover:text-white rounded-md p-1">10:00 am - 09:00 pm</button></td>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-[#086788]">Wednesday</th>
                                        <td className="border p-2 border-[#086788] text-sm font-semibold"><button title="Click to edit" className="hover:bg-green-400 hover:text-white rounded-md p-1">10:00 am - 09:00 pm</button></td>
                                    </tr>
                                    <tr>
                                        <th className="border border-[#086788]">Thursday</th>
                                        <td className="border p-2 border-[#086788] text-sm font-semibold"><button title="Click to edit" className="hover:bg-green-400 hover:text-white rounded-md p-1">10:00 am - 09:00 pm</button></td>
                                    </tr>
                                    <tr>
                                        <th className=" border border-[#086788]">Friday</th>
                                        <td className="border p-2 border-[#086788] text-sm font-semibold"><button title="Click to edit" className="hover:bg-green-400 hover:text-white rounded-md p-1">10:00 am - 09:00 pm</button></td>
                                    </tr>

                                    <tr className="">
                                        <th className=" border border-[#086788]">Saturday</th>
                                        <td className="border p-2 border-[#086788] text-sm font-semibold"><button title="Click to edit" className="hover:bg-green-400 hover:text-white rounded-md p-1">10:00 am - 09:00 pm</button></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div></div>



                </Form>)}


            {createAvailabilityModal && (<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 border-2 rounded-xl border-[#086788] text-[#086788] p-4">
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
                <div className="flex justify-around">
                    <button type="submit" className="rounded-md  px-4 py-2  border-2 border-[#086788] text-2xl font-semibold hover:bg-green-400 hover:border-transparent hover:text-white">Create</button>
                    <button type="submit" className="rounded-md  px-4 py-2  border-2 border-[#086788] text-2xl font-semibold hover:bg-red-400 hover:border-transparent hover:text-white" onClick={() => { setCreateAvailabilityModal(!createAvailabilityModal) }}>Discard</button>
                </div>


            </div>)}

            {updateAvailabilityModal && (<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 border-2 rounded-xl border-[#086788] text-[#086788] p-4">
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
                <div className="flex justify-around">
                    <button type="submit" className="rounded-md  px-4 py-2  border-2 border-[#086788] text-2xl font-semibold hover:bg-green-400 hover:border-transparent hover:text-white">Update</button>
                    <button type="submit" className="rounded-md  px-4 py-2  border-2 border-[#086788] text-2xl font-semibold hover:bg-red-400 hover:border-transparent hover:text-white" onClick={() => { setUpdateAvailabilityModal(!updateAvailabilityModal) }}>Discard</button>
                </div>


            </div>)}

            <button className="bg-white w-20 h-20 fixed bottom-20 right-20 rounded-full p-5 shadow-md shadow-black" onClick={() => setCreateDoctorModal(!createDoctorModal)}>
                <Image src={create} width={64} height={64} className="text-white" alt="create button image" />
            </button>

            <Logout />
        </div>
    </>)
}