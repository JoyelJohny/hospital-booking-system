'use client'
import SearchBar from "@/app/(components)/SearchBarComponent";
import Image from "next/image";
import doctorImage from "@/public/doctor.jpg"
import { useEffect, useState } from "react";
import Link from "next/link";


type Doctor = {
    _id: string,
    name: string,
    specialization: string,
    treatmentId: string
    contact: string
}

// type Availability = {
//     _id: string,
//     doctorId: string
//     dayOfWeek: string,
//     startTime: string,
//     endTime: string,
//     slotDuration: number,
//     bufferTime: number,
// }

type treatment = { _id: string, name: string }

const api_url = process.env.NEXT_PUBLIC_API_URI

export default function Doctors() {
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [treatments, setTreatments] = useState<treatment[]>([])
    const [selectedListByValue, setSelectedListByValue] = useState('')

    const handleSearchBar = () => {

    }
    useEffect(() => {
        getDoctorsData();
    }, []);
    const getDoctorsData = async () => {
        try {

            const res = await fetch(`${api_url}/api/v1/public/doctors`, { method: "GET" })
            const { doctors, treatments } = await res.json()
            setTreatments(treatments)
            setDoctors(doctors)
        } catch (error) {
            console.error(error)
        } finally {

        }
    }
    return (
        <div className="flex flex-col gap-2 px-5 py-5 lg:px-10 xl:px-32">
            <div className="text-xs pb-2">&gt; <Link href="/" className="text-blue-700">Home</Link> &gt; <Link href="/doctors" className="text-blue-700">Doctors</Link></div>
            <SearchBar searchAction={handleSearchBar} placeHolder="Search for Doctors" />
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold lg:text-3xl">Our Doctors</h1>
                <div className="flex gap-2 items-center text-xs lg:hidden">
                    <p>List By</p>
                    <select value={selectedListByValue} onChange={(e) => setSelectedListByValue(e.currentTarget.value)} className="border border-blue-700 focus:outline-none p-1 rounded-full">
                        <option value="">All</option>
                        {treatments.map((treatment) => <option key={treatment._id} value={treatment.name}>{treatment.name}</option>)}
                    </select>
                </div>
            </div>
            <div className="flex">
                <div className="hidden lg:flex flex-col pr-5 pl-2 py-2 text-xs space-y-1 min-w-60">
                    <h2 className="text-lg">Categories</h2>
                    <button onClick={() => setSelectedListByValue('')} className={`w-fit lg:hover:underline ${selectedListByValue == '' ? 'lg:underline' : ''}`}>All</button>
                    {treatments.map((treatment) => <button className={`w-fit lg:hover:underline ${selectedListByValue == treatment.name ? 'lg:underline' : ''}`} key={treatment._id} onClick={() => setSelectedListByValue(`${treatment.name}`)}>{treatment.name}</button>)}
                </div>
                <div className="grid grid-cols-1 w-full gap-4 pt-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {doctors.filter(doctor => selectedListByValue ? doctor.specialization == selectedListByValue : true).map((doctor) =>
                        <div key={doctor._id} className="flex bg-white gap-4 p-2 border border-blue-700 rounded-xl w-full lg:flex-col ">
                            <Image src={doctorImage} className="size-12 object-cover object-top rounded-full lg:rounded-xl lg:size-60" alt="" />
                            <div className=" flex grow items-center justify-between md:gap-5 lg:flex-col lg:items-start ">
                                <div className="">
                                    <p className="text-xs ">{doctor.specialization}</p>
                                    <p className=" text-sm font-semibold">{doctor.name}</p>
                                    <p className="text-xs ">{doctor.contact}</p>
                                </div>
                                <button className="bg-blue-700 px-2 py-1 text-xs rounded-md text-white w-fit lg:flex lg:mx-auto ">Book <span className="hidden lg:block">&nbsp; an Appointment</span></button>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </div>)
}