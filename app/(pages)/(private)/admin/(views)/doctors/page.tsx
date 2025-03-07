"use client"

import Image from "next/image"
// import add from "@/public/addition.png"
// import addAppointmentIcon from "@/public/add-appointment.png"
import doctorImage from "@/public/doctor.jpg"
// import create from "@/public/write.png"
// import edit from "@/public/edit-text.png"
// import bin from "@/public/bin.png"
// import reject from "@/public/reject.png"
// import Form from "next/form"
// import DividerComponent from "@/app/(components)/DividerComponent"
import { useEffect, useState } from "react"
// import Logout from "@/app/(components)/LogoutComponent"
// import { getTimings } from "@/libs/utils"
// import Loading from "@/app/(components)/LoadingComponent"
// import Message from "@/app/(components)/MessageComponent"
// import Link from "next/link"

import AvailabilityModal from "./Components/AvailabilityModal"
import SearchBar from "@/app/(components)/SearchBarComponent"
import SlotModal from "./Components/SlotModal"
import DoctorModal from "./Components/DoctorModal"

type Doctor = {
    _id: string,
    name: string,
    specialization: string,
    treatmentId: string
    contact: string
}

type Availability = {
    _id: string,
    doctorId: string
    dayOfWeek: string,
    startTime: string,
    endTime: string,
    slotDuration: number,
    bufferTime: number,
}

type treatment = { _id: string, name: string }

const api_url = process.env.NEXT_PUBLIC_API_URI

export default function Doctor() {
    // const [trigger, setTrigger] = useState(0)
    // const [response, setResponse] = useState<{ message: '', messageType: '' } | null>(null)
    // const [loading, isLoading] = useState<boolean>(true)
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [treatments, setTreatments] = useState<treatment[]>([])
    const [availabilities, setAvailabilities] = useState<Availability[]>()
    const [selectedDoctorDetail, setSelectedDoctorDetail] = useState<Doctor>({ _id: '', name: '', specialization: '', treatmentId: '', contact: '' })
    const [selectedAvailabilityDetail, setSelectedAvailibilityDetail] = useState<Availability>({ _id: '', dayOfWeek: '', doctorId: '', slotDuration: 30, bufferTime: 10, startTime: '', endTime: '' })
    const [createDoctorModal, setCreateDoctorModal] = useState(false)
    const [updateDoctorModal, setUpdateDoctorModal] = useState(false)
    const [availabilityModal, setAvailabilityModal] = useState(false)
    // const [createAvailabilityModal, setCreateAvailabilityModal] = useState(false)
    // const [updateAvailabilityModal, setUpdateAvailabilityModal] = useState(false)
    const [selectedDay, setSelectedDay] = useState("Sunday")
    const [updateSlotModal, setUpdateSlotModal] = useState(false)
    const [createSlotModal, setCreateSlotModal] = useState(false)
    const [selectedListByValue, setSelectedListByValue] = useState('')

    useEffect(() => {
        getDoctorsData();
    }, []);


    const getDoctorsData = async () => {
        try {
            // isLoading(true)
            const res = await fetch(`${api_url}/api/v1/private/doctors`, { method: "GET" })
            const { doctors, treatments } = await res.json()
            setTreatments(treatments)
            setDoctors(doctors)
        } catch (error) {
            console.error(error)
        } finally {
            // isLoading(false)
        }
    }

    const getAvailabilitiesData = async (id: string) => {
        try {
            const res = await fetch(`${api_url}/api/v1/private/doctors/${id}/availabilities`, { method: "GET", credentials: 'include' })
            const result = await res.json()
            if (result.message != 'No Schedules') {
                setAvailabilities(result)
            }

        } catch (error) {
            console.error(error)
        }
    }

    // const handleDayButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault()
    //     const val = e.currentTarget.value
    //     setSelectedDay(val)
    // }

    // const handleCloseAvailabilityModal = () => {
    //     if (createAvailabilityModal) setCreateAvailabilityModal(!createAvailabilityModal)
    //     setAvailabilityModal(!availabilityModal)
    // }
    const handleCreateButton = async (formdata: FormData) => {
        setCreateDoctorModal(!createDoctorModal)
        const treatment = treatments.find((item) => item._id == formdata.get('treatmentId'))
        const specialization = treatment?.name || ''
        formdata.append('specialization', specialization)
        const data = JSON.stringify(Object.fromEntries(formdata))
        try {
            await fetch(`${api_url}/api/v1/private/doctors`, { method: "POST", body: data, credentials: 'include' })
            // const result = await res.json()
            // if (result) {
            //     setResponse({ message: result.message, messageType: result.messageType })
            //     setTrigger((prev) => prev + 1)
            // }

            getDoctorsData()
        } catch (error) {
            console.error(error)
        }
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setSelectedDoctorDetail((prev) => ({ ...prev, [name]: value }))
    }

    // const handleDeleteButton = async (id: string) => {
    //     try {
    //         console.log(id)
    //         const res = await fetch(`${api_url}/api/v1/private/doctors/${id}`, { method: "DELETE", credentials: 'include' })
    //         const result = await res.json()
    //         if (result) {
    //             setResponse({ message: result.message, messageType: result.messageType })
    //             setTrigger((prev) => prev + 1)
    //         }

    //         getDoctorsData()
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    const handleUpdateButton = async (formdata: FormData) => {
        try {
            setUpdateDoctorModal(!updateDoctorModal)
            const treatment = treatments.find((item) => item._id == formdata.get('treatmentId'))
            const specialization = treatment?.name || ''
            formdata.append('specialization', specialization)
            const data = JSON.stringify(Object.fromEntries(formdata))
            const id = selectedDoctorDetail._id

            await fetch(`${api_url}/api/v1/private/doctors/${id}`, { method: "PATCH", body: data, credentials: 'include' })
            // const result = await res.json()
            // if (result) {
            //     setResponse({ message: result.message, messageType: result.messageType })
            //     setTrigger((prev) => prev + 1)
            // }

            getDoctorsData()
        } catch (error) {
            console.error(error)
        }
    }

    const handleOpenAvailabilityModal = (doctorId: string) => {
        setAvailabilityModal(prev => !prev)
        getAvailabilitiesData(doctorId)
    }

    const handleCreateAvailabilityButton = async (formdata: FormData) => {
        try {
            setCreateSlotModal(prev => !prev)
            formdata.append('dayOfWeek', selectedDay)
            const data = JSON.stringify(Object.fromEntries(formdata))
            const res = await fetch(`${api_url}/api/v1/private/doctors/${selectedDoctorDetail._id}/availabilities`, { method: "POST", body: data })
            const result = await res.json()
            console.log(result)
            getAvailabilitiesData(selectedDoctorDetail._id)
        } catch (error) {
            console.error(error)
        }

    }

    const handleOpenUpdateAvailabilityButton = (slot: Availability) => {
        setSelectedAvailibilityDetail(slot)
        setSelectedDay(slot.dayOfWeek)
        setUpdateSlotModal(prev => !prev)
    }

    const handleUpdateAvaialabilityButton = async (formdata: FormData) => {
        try {
            setUpdateSlotModal(prev => !prev)
            formdata.append('dayOfWeek', selectedDay)
            const id = selectedAvailabilityDetail._id
            const data = JSON.stringify(Object.fromEntries(formdata))
            await fetch(`${api_url}/api/v1/private/doctors/${selectedDoctorDetail._id}/availabilities/${id}`, { method: "PATCH", body: data, credentials: 'include' })
            // const result = await res.json()
            getAvailabilitiesData(selectedDoctorDetail._id)
        } catch (error) {
            console.error(error)
        }

    }

    // const handleUpdateAvailabilityDeleteButton = async () => {
    //     try {
    //         setUpdateAvailabilityModal(!updateAvailabilityModal)
    //         const id = selectedAvailabilityDetail._id
    //         console.log(selectedDoctorDetail._id)
    //         const res = await fetch(`${api_url}/api/v1/private/doctors/${selectedDoctorDetail._id}/availabilities/${id}`, { method: "DELETE", credentials: 'include' })
    //         const result = await res.json()
    //         if (result) {
    //             setResponse({ message: result.message, messageType: result.messageType })
    //             setTrigger((prev) => prev + 1)
    //         }

    //         getAvailabilitiesData(selectedDoctorDetail._id)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    const handleAvailabilityUpdateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setSelectedAvailibilityDetail((prev) => ({ ...prev, [name]: value }))
    }

    const handleEditButton = (doctor: Doctor) => {
        setSelectedDoctorDetail(doctor)
        setUpdateDoctorModal(prev => !prev)
    }


    return (
        <div className="flex flex-col h-full bg-slate-800">
            <div className="h-[8%] w-full px-5 py-2  rounded-b-lg lg:hidden">
                <div className="flex  gap-2 items-center justify-start">

                    <div className="text-lg font-semibold text-nowrap text-white">Holy Memorial Hospital</div>
                </div>
            </div>
            <div className="h-[92%] p-2 lg:h-full">
                <div className="relative flex flex-col h-full gap-2 px-3 py-3  rounded-md bg-white overflow-hidden lg:px-5 lg:py-5">
                    <div className="space-y-2">
                        <h1 className="text-slate-800 text-lg font-semibold lg:text-2xl">Manage Doctors</h1>
                        <div className="flex gap-2">
                            <SearchBar
                                placeHolder="Search Doctor"
                                searchAction={console.log}
                                searchBoxStyling="flex grow h-8"
                                textBoxStyling="w-full py-1 px-3 text-xs focus:outline-none border border-r-0 rounded-l-full border-slate-700"
                                searchButtonStyling="flex border border-slate-800 bg-slate-800 rounded-r-full items-center justify-center w-12"
                            />
                            <button className="text-white text-xs bg-slate-800 rounded-md w-fit px-1" onClick={() => setCreateDoctorModal(prev => !prev)}>Add Doctor</button>
                        </div>

                        <div className="flex text-sm justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <span>Doctors</span>
                                <select name="" id="" value={selectedListByValue} onChange={(e) => setSelectedListByValue(e.currentTarget.value)} className="border p-1 focus:outline-none rounded-md border-slate-800 text-xs">
                                    <option value="">All</option>
                                    {treatments.map((treatment) => <option key={treatment._id} value={treatment.name}>{treatment.name}</option>)}
                                </select>
                            </div>

                            <span className="p-2">Option</span>
                        </div>
                        <hr className="border-slate-800" />
                    </div>


                    <div className="flex flex-col overflow-auto gap-2">
                        {doctors.filter(doctor => selectedListByValue ? doctor.specialization == selectedListByValue : true).map((doctor) =>
                            <div key={doctor._id} className="flex justify-between py-1 px-2 border rounded-lg border-slate-800 text-sm items-center">
                                <div className="flex items-center gap-2">
                                    <Image src={doctorImage} alt="" className="object-top object-cover rounded-full size-14 " />
                                    <div className="flex flex-col leading-none gap-1">
                                        <span className="text-xs ">{doctor.specialization}</span>
                                        <span className="font-semibold ">{doctor.name}</span>
                                        <span className="text-xs">{doctor.contact}</span>
                                    </div>
                                </div>
                                <button className="text-xs text-white font-semibold px-4 w-fit py-1 h-fit bg-slate-800 rounded-md" onClick={() => handleEditButton(doctor)}>Edit</button>
                            </div>)}

                    </div>
                    {createDoctorModal && <DoctorModal treatments={treatments} formSubmitaction={handleCreateButton} discard={setCreateDoctorModal} availabilityModal={handleOpenAvailabilityModal} />}
                    {updateDoctorModal && <DoctorModal treatments={treatments} formSubmitaction={handleUpdateButton} discard={setUpdateDoctorModal} availabilityModal={handleOpenAvailabilityModal} doctorDetail={selectedDoctorDetail} doctorDetailChange={handleEditChange} />}
                    {availabilityModal && <AvailabilityModal updateSlotModal={handleOpenUpdateAvailabilityButton} closeModal={setAvailabilityModal} createSlotModal={setCreateSlotModal} slotsData={availabilities} />}
                    {createSlotModal && <SlotModal selectedDay={selectedDay} changeSelectedDay={setSelectedDay} formSubmitAction={handleCreateAvailabilityButton} closeModal={setCreateSlotModal} />}
                    {updateSlotModal && <SlotModal selectedDay={selectedDay} changeSelectedDay={setSelectedDay} formSubmitAction={handleUpdateAvaialabilityButton} closeModal={setUpdateSlotModal} selectedSlotDetail={selectedAvailabilityDetail} slotDetailChange={handleAvailabilityUpdateInputChange} />}
                </div>
            </div>

        </div>

        // <div className="flex flex-col px-5 py-5 h-full gap-4 lg:px-10 xl:px-32">
        //     <div className="text-xs">&gt; <Link href="/admin/dashboard" className="text-blue-700">Home</Link> &gt; <Link href="/admin/doctors" className="text-blue-700">Doctors</Link></div>
        //     <div className="flex justify-between ">
        //         <h1 className=" font-semibold text-blue-700 text-3xl md:text-4xl lg:text-5xl">Doctors List</h1>
        //         <div className="flex gap-2 border px-1 rounded-lg border-blue-700 lg:hover:cursor-pointer lg:hover:scale-110">
        //             <Image src={add} alt="" className="size-5  my-auto lg:size-8" />
        //             <span className="text-blue-700 font-semibold my-auto text-xs lg:text-sm">Add Doctor</span>
        //         </div>

        //     </div>

        //     <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mt-5">
        //         <div className="flex flex-col bg-white gap-1 w-full border border-blue-700 rounded-2xl justify-between p-1 xl:p-2">
        //             <div className=" ">
        //                 <Image src={doctor} alt="" className="rounded-t-2xl" />
        //             </div >
        //             <div className="p-2 w-full">
        //                 <p className="text-xs">Cardiology</p>
        //                 <p className="font-bold text-xl ">Dr. Arun Joseph</p>
        //                 <p className=" text-xs break-words font-light">arunjoseph@gmail.com</p>
        //                 <div className="flex mt-3 text-white gap-1 justify-between rounded-lg lg:justify-around items-center">
        //                     <button className="flex gap-1 border rounded-lg p-2 bg-blue-700 md:p-1 md:rounded-md xl:p-2 lg:hover:cursor-pointer lg:hover:scale-110" onClick={() => setUpdateDoctorModal(!updateDoctorModal)}>
        //                         <Image src={edit} alt="" className="size-4 " />
        //                         <span className="hidden md:block text-xs select-none">Edit</span>
        //                     </button>
        //                     <button className="flex gap-1 border rounded-lg p-2 bg-blue-700 md:p-1 md:rounded-md xl:p-2 lg:hover:cursor-pointer lg:hover:scale-110" onClick={() => setAvailabilityModal(!availabilityModal)}>
        //                         <Image src={addAppointmentIcon} alt="" className="size-4 " />
        //                         <span className="hidden md:block text-xs select-none">Schedule</span>
        //                     </button>
        //                     <button className="flex gap-1 border rounded-lg p-2 bg-blue-700 md:p-1 md:rounded-md xl:p-2 lg:hover:cursor-pointer lg:hover:scale-110">
        //                         <Image src={bin} alt="" className="size-4 " />
        //                         <span className="hidden md:block text-xs select-none">Delete</span>
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //         {updateDoctorModal && <DoctorUpdateModal discard={setUpdateDoctorModal} />}
        //         {availabilityModal && <AvailabilityModal closeModal={setAvailabilityModal} />}
        //     </div>



        //     {/* <h1 className="text-[#086788] text-5xl px-6 font-semibold">Doctors</h1>
        //     {loading ? <Loading /> : (
        //         <div>
        //             {doctors.length == 0 &&
        //                 (<div className="text-[#086788] pt-44 text-center text-3xl ">No Doctors have been created</div>)}
        //             <div className="grid grid-cols-3 gap-10 w-full h-full place-content-center ">
        //                 {Array.isArray(doctors) && doctors.map((doctor) => (
        //                     <div key={doctor._id} className="flex flex-col bg-[#086788] p-5 justify-center rounded-3xl ">
        //                         <div className="flex justify-between">
        //                             <h2 className="text-2xl py-1 font-semibold">{doctor.name}</h2>
        //                             <div className="flex gap-2">
        //                                 <button className="w-10 h-10 hover:bg-green-400 p-2 rounded-xl" onClick={() => handleEdit(doctor)}><Image src={edit} width={24} height={24} alt="edit button image" /></button>
        //                                 <button className="w-10 h-10 hover:bg-red-400 p-2 rounded-xl" onClick={() => handleDeleteButton(doctor._id)}><Image src={bin} width={24} height={24} alt="delete button image" /></button>
        //                             </div>
        //                         </div>
        //                         <div className="flex justify-between py-1">
        //                             <div>
        //                                 <p className="text-sm">{doctor.specialization}</p>
        //                                 <p className="text-xs">{doctor.contact}</p>
        //                             </div>
        //                             <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent" onClick={() => handleOpenAvailabilityModal(doctor)}>Set availability</button>
        //                         </div>
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>)}




        //     {/* Doctor updation Form*/}

        //     {/* {updateDoctorModal && (<Form action={(e) => handleUpdateButton(e, selectedDoctorDetail._id)} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center bg-[#086788] border-4 border-gray-100 w-1/3 p-6 rounded-lg space-y-5">
        //         <h1 className="text-center font-semibold text-2xl">Update Doctor</h1>
        //         <div className="flex justify-between gap-2">
        //             <label htmlFor="" className="py-2 font-semibold text-sm w-28">Dr Name</label>
        //             <input type="text" name="name" value={selectedDoctorDetail.name} onChange={handleEditChange} className="text-black p-2 rounded-md focus:outline-slate-500 w-full" />
        //         </div>
        //         <div className="flex justify-between gap-2">
        //             <label htmlFor="" className="py-2 font-semibold text-sm text-nowrap">Specialization</label>
        //             <select name="treatmentId" defaultValue={selectedDoctorDetail.treatmentId} className="w-full text-black p-2 rounded-md focus:outline-slate-500">
        //                 {treatments && treatments.map((treatment) => (<option key={treatment._id} className="text-black" value={treatment._id} >{treatment.name}</option>))}
        //             </select>
        //         </div>
        //         <div className="flex justify-between gap-2">
        //             <label htmlFor="" className="py-2 font-semibold text-sm w-28">Contact</label>
        //             <input type="text" name="contact" value={selectedDoctorDetail.contact} onChange={handleEditChange} className="text-black p-2 rounded-md focus:outline-slate-500 w-full" />
        //         </div>
        //         <div className="flex justify-around gap-2">
        //             <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent">Update</button>
        //             <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-red-400 hover:border-transparent" onClick={() => setUpdateDoctorModal(!updateDoctorModal)}>Cancel</button>
        //         </div>
        //     </Form>)} */}


        //     {/* Doctor creation Form*/}

        //     {/* {createDoctorModal && (<Form action={handleCreateButton} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center border-4 border-gray-100 bg-[#086788] w-1/3 p-6 rounded-lg space-y-5">
        //         <h1 className="text-center font-semibold text-2xl">Create new Doctor</h1>
        //         <div className="flex justify-between gap-2">
        //             <label htmlFor="" className="py-2 font-semibold text-sm w-28">Dr Name</label>
        //             <input type="text" name="name" className="text-black p-2 rounded-md focus:outline-slate-500 w-full" />
        //         </div>

        //         <div className="flex justify-between gap-2">
        //             <label htmlFor="" className="py-2 font-semibold text-sm text-nowrap">Specialization</label>
        //             <select name="treatmentId" className="w-full text-black p-2 rounded-md focus:outline-slate-500">
        //                 {treatments && treatments.map((treatment) => (<option key={treatment._id} className="text-black" value={treatment._id} >{treatment.name}</option>))}
        //             </select>
        //         </div>
        //         <div className="flex justify-between gap-2">
        //             <label htmlFor="" className="py-2 font-semibold text-sm w-28">Contact</label>
        //             <input type="email" name="contact" className="text-black p-2 rounded-md focus:outline-slate-500 w-full" />
        //         </div>
        //         <div className="flex justify-around gap-2">
        //             <button type="submit" className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent">Create</button>
        //             <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-red-400 hover:border-transparent" onClick={() => setCreateDoctorModal(!createDoctorModal)}>Cancel</button>
        //         </div>
        //     </Form>)} */}


        //     {/* {availabilityModal && (
        //         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-3 text-[#086788] border-4 border-[#086788] rounded-xl w-2/3">
        //             <button className="flex justify-self-end p-1 mb-2 rounded-lg text-white bg-[#086788] hover:bg-red-400" onClick={handleCloseAvailabilityModal}>
        //                 <Image src={reject} width={24} height={24} alt="close the availability modal" />
        //             </button>
        //             <div>
        //                 <div className="rounded-xl px-5 py-3 bg-[#086788] border-2 text-gray-100">
        //                     <p className="text-xl font-bold">{selectedDoctorDetail.name}</p>
        //                     <div className="flex justify-between">
        //                         <div>
        //                             <p className="text-xs">{selectedDoctorDetail.specialization}</p>
        //                             <p className="text-xs">{selectedDoctorDetail.contact}</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <DividerComponent />
        //                 <div className="flex mb-4 justify-between">
        //                     <h1 className="px-4  text-2xl font-semibold">Schedule</h1>
        //                     <button className="hover:bg-green-400 hover:text-white rounded-md  px-2 border-2 border-[#086788]" onClick={() => setCreateAvailabilityModal(!createAvailabilityModal)}>Add New</button>
        //                 </div>
        //                 <div className="flex overflow-x-scroll border-2  rounded-xl border-[#086788]">
        //                     <table className="border-collapse border-1 ">
        //                         <tbody>
        //                             <tr className="text-center">
        //                                 <th className="border p-2 border-[#086788] ">Sunday</th>
        //                                 {Array.isArray(availabilities) && availabilities.filter((slot) => slot.dayOfWeek == 'Sunday').sort((a, b) => (a.startTime.localeCompare(b.startTime))).map((slot) => (<td key={slot.startTime} className="border p-2 border-[#086788] text-sm font-semibold"><button title="Click to edit" className="hover:bg-green-400 hover:text-white rounded-md p-1 text-nowrap" onClick={() => handleOpenUpdateAvailabilityButton(slot)}>{getTimings(slot.startTime, slot.endTime)}</button></td>))}
        //                             </tr>
        //                             <tr>
        //                                 <th className="border p-2 border-[#086788]">Monday</th>
        //                                 {Array.isArray(availabilities) && availabilities.filter((slot) => slot.dayOfWeek == 'Monday').sort((a, b) => (a.startTime.localeCompare(b.startTime))).map((slot) => (<td key={slot.startTime} className="border p-2 border-[#086788] text-sm font-semibold"><button title="Click to edit" className="hover:bg-green-400 hover:text-white rounded-md p-1 text-nowrap" onClick={() => handleOpenUpdateAvailabilityButton(slot)}>{getTimings(slot.startTime, slot.endTime)}</button></td>))}
        //                             </tr>
        //                             <tr>
        //                                 <th className="border p-2 border-[#086788]">Tuesday</th>
        //                                 {Array.isArray(availabilities) && availabilities.filter((slot) => slot.dayOfWeek == 'Tuesday').sort((a, b) => (a.startTime.localeCompare(b.startTime))).map((slot) => (<td key={slot.startTime} className="border p-2 border-[#086788] text-sm font-semibold"><button title="Click to edit" className="hover:bg-green-400 hover:text-white rounded-md p-1 text-nowrap" onClick={() => handleOpenUpdateAvailabilityButton(slot)}>{getTimings(slot.startTime, slot.endTime)}</button></td>))}
        //                             </tr>
        //                             <tr>
        //                                 <th className="p-2 border border-[#086788]">Wednesday</th>
        //                                 {Array.isArray(availabilities) && availabilities.filter((slot) => slot.dayOfWeek == 'Wednesday').sort((a, b) => (a.startTime.localeCompare(b.startTime))).map((slot) => (<td key={slot.startTime} className="border p-2 border-[#086788] text-sm font-semibold"><button title="Click to edit" className="hover:bg-green-400 hover:text-white rounded-md p-1 text-nowrap" onClick={() => handleOpenUpdateAvailabilityButton(slot)}>{getTimings(slot.startTime, slot.endTime)}</button></td>))}
        //                             </tr>
        //                             <tr>
        //                                 <th className="border p-2 border-[#086788]">Thursday</th>
        //                                 {Array.isArray(availabilities) && availabilities.filter((slot) => slot.dayOfWeek == 'Thursday').sort((a, b) => (a.startTime.localeCompare(b.startTime))).map((slot) => (<td key={slot.startTime} className="border p-2 border-[#086788] text-sm font-semibold"><button title="Click to edit" className="hover:bg-green-400 hover:text-white rounded-md p-1 text-nowrap" onClick={() => handleOpenUpdateAvailabilityButton(slot)}>{getTimings(slot.startTime, slot.endTime)}</button></td>))}
        //                             </tr>
        //                             <tr>
        //                                 <th className=" border p-2 border-[#086788]">Friday</th>
        //                                 {Array.isArray(availabilities) && availabilities.filter((slot) => slot.dayOfWeek == 'Friday').sort((a, b) => (a.startTime.localeCompare(b.startTime))).map((slot) => (<td key={slot.startTime} className="border p-2 border-[#086788] text-sm font-semibold"><button title="Click to edit" className="hover:bg-green-400 hover:text-white rounded-md p-1 text-nowrap" onClick={() => handleOpenUpdateAvailabilityButton(slot)}>{getTimings(slot.startTime, slot.endTime)}</button></td>))}
        //                             </tr>

        //                             <tr className="">
        //                                 <th className=" border p-2 border-[#086788]">Saturday</th>
        //                                 {Array.isArray(availabilities) && availabilities.filter((slot) => slot.dayOfWeek == 'Saturday').sort((a, b) => (a.startTime.localeCompare(b.startTime))).map((slot) => (<td key={slot.startTime} className="border p-2 border-[#086788] text-sm font-semibold"><button title="Click to edit" className="hover:bg-green-400 hover:text-white rounded-md p-1 text-nowrap" onClick={() => handleOpenUpdateAvailabilityButton(slot)}>{getTimings(slot.startTime, slot.endTime)}</button></td>))}
        //                             </tr>
        //                         </tbody>
        //                     </table>
        //                 </div>
        //             </div>
        //         </div>)} */}


        //     {/* {createAvailabilityModal && (<Form action={handleCreateAvailabilityButton} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 border-2 rounded-xl border-[#086788] text-[#086788] p-4">
        //         <h1 className="text-center font-semibold text-2xl pb-4">Create New Slot</h1>
        //         <div className="flex justify-between">
        //             <p className="font-semibold">Select the day</p>
        //             <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Sunday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Sunday" onClick={handleDayButton}>Sunday</button>
        //             <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Monday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Monday" onClick={handleDayButton}>Monday</button>
        //             <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Tuesday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Tuesday" onClick={handleDayButton}>Tuesday</button>
        //             <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Wednesday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Wednesday" onClick={handleDayButton}>Wednesday</button>
        //             <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Thursday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Thursday" onClick={handleDayButton}>Thursday</button>
        //             <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Friday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Friday" onClick={handleDayButton}>Friday</button>
        //             <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Saturday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Saturday" onClick={handleDayButton}>Saturday</button>

        //         </div>

        //         <div className="grid grid-cols-4 gap-4 py-6">
        //             <label htmlFor="" className="py-1 font-semibold">Start time</label><input type="time" name="startTime" className=" border-2 border-[#086788] rounded-md p-1" />
        //             <label htmlFor="" className="py-1 font-semibold">End time</label><input type="time" name="endTime" className=" border-2 border-[#086788] rounded-md p-1" />
        //             <label htmlFor="" className="py-1 font-semibold">Slot Duration (in Min)</label><input type="Number" name="slotDuration" min="5" max="90" className=" border-2 border-[#086788] rounded-md p-1" />
        //             <label htmlFor="" className="py-1 font-semibold">Buffer Time (in Min)</label><input type="Number" name="bufferTime" min="5" max="30" className=" border-2 border-[#086788] rounded-md p-1" />
        //         </div>
        //         <div className="flex justify-around">
        //             <button type="submit" className="rounded-md  px-4 py-2  border-2 border-[#086788] text-2xl font-semibold hover:bg-green-400 hover:border-transparent hover:text-white">Create</button>
        //             <button className="rounded-md  px-4 py-2  border-2 border-[#086788] text-2xl font-semibold hover:bg-red-400 hover:border-transparent hover:text-white" onClick={() => setCreateAvailabilityModal(!createAvailabilityModal)}>Discard</button>
        //         </div>


        //     </Form>)} */}

        //     {/* {updateAvailabilityModal && (<Form action={(e) => handleUpdateAvaialabilityButton(e, selectedAvailabilityDetail._id)} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 border-2 rounded-xl border-[#086788] text-[#086788] p-4">
        //         <h1 className="text-center font-semibold text-2xl pb-4">Update Slot</h1>
        //         <div className="flex justify-between">
        //             <p className="font-semibold">Select the day</p>
        //             <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Sunday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Sunday" onClick={handleDayButton}>Sunday</button>
        //             <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Monday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Monday" onClick={handleDayButton}>Monday</button>
        //             <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Tuesday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Tuesday" onClick={handleDayButton}>Tuesday</button>
        //             <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Wednesday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Wednesday" onClick={handleDayButton}>Wednesday</button>
        //             <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Thursday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Thursday" onClick={handleDayButton}>Thursday</button>
        //             <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Friday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Friday" onClick={handleDayButton}>Friday</button>
        //             <button className={`rounded-md  border-2 px-2 py-1 text-xs font-semibold  ${selectedDay == "Saturday" ? "border-[#086788] bg-green-400 text-white" : "border-[#086788] hover:bg-green-400 hover:text-white hover:border-transparent"} `} name="dayOfWeek" value="Saturday" onClick={handleDayButton}>Saturday</button>
        //         </div>
        //         <div className="grid grid-cols-4 gap-4 py-6">
        //             <label htmlFor="" className="py-1 font-semibold">Start time</label><input type="time" name="startTime" value={selectedAvailabilityDetail.startTime} className=" border-2 border-[#086788] rounded-md p-1" onChange={handleAvailabilityUpdateInputChange} />
        //             <label htmlFor="" className="py-1 font-semibold">End time</label><input type="time" name="endTime" value={selectedAvailabilityDetail.endTime} className=" border-2 border-[#086788] rounded-md p-1" onChange={handleAvailabilityUpdateInputChange} />
        //             <label htmlFor="" className="py-1 font-semibold">Slot Duration (in Min)</label><input name="slotDuration" type="Number" value={(selectedAvailabilityDetail.slotDuration).toString()} min="5" max="90" className=" border-2 border-[#086788] rounded-md p-1" onChange={handleAvailabilityUpdateInputChange} />
        //             <label htmlFor="" className="py-1 font-semibold">Buffer Time (in Min)</label><input name="bufferTime" type="Number" value={(selectedAvailabilityDetail.bufferTime).toString()} min="5" max="30" className=" border-2 border-[#086788] rounded-md p-1" onChange={handleAvailabilityUpdateInputChange} />
        //         </div>
        //         <div className="flex justify-around">
        //             <button type="submit" className="rounded-md  px-4 py-2  border-2 border-[#086788] text-2xl font-semibold hover:bg-green-400 hover:border-transparent hover:text-white">Update</button>
        //             <button className="rounded-md  px-4 py-2  border-2 border-[#086788] text-2xl font-semibold hover:bg-red-400 hover:border-transparent hover:text-white" onClick={handleUpdateAvailabilityDeleteButton}>Delete</button>
        //             <button className="rounded-md  px-4 py-2  border-2 border-[#086788] text-2xl font-semibold hover:bg-red-400 hover:border-transparent hover:text-white" onClick={() => { setUpdateAvailabilityModal(!updateAvailabilityModal) }}>Discard</button>
        //         </div>
        //     </Form>)} */}

        //     {/* <button className="bg-[#086788] w-20 h-20 fixed bottom-20 right-20 rounded-full p-5 shadow-md shadow-black" onClick={() => setCreateDoctorModal(!createDoctorModal)}>
        //         <Image src={create} width={64} height={64} className="text-white" alt="create button image" />
        //     </button>  */}


        // </div>
    )
}