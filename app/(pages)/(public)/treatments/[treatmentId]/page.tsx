"use client"
import Image from "next/image"
import Loading from "@/app/(components)/LoadingComponent"
import TreatmentDetailComponent from "@/app/(components)/TreatmentDetailComponent"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import treatmentImage from "@/public/treatments.png"
import doctorImage from "@/public/doctor.jpg"

type Doctor = {
    _id: string,
    name: string,
    specialization: string
    contact: string
}

type Treatment = {
    _id: string,
    name: string,
    description: string
}

const api_url = process.env.NEXT_PUBLIC_API_URI

export default function SpecificTreatment() {
    const [isLoading, setLoading] = useState<boolean>(true)
    const { treatmentId } = useParams<{ treatmentId: string }>()
    const [treatment, setTreatment] = useState<Treatment>({ _id: '', name: '', description: '' })
    const [doctors, setDoctors] = useState<Doctor[]>([])

    useEffect(() => {
        getInitialData()
    }, [])

    const getInitialData = async () => {
        try {
            const res = await fetch(`${api_url}/api/v1/public/treatments/${treatmentId}/doctors`, { method: "GET" })
            const { doctorsList, treatment } = await res.json()
            setDoctors(doctorsList)
            setTreatment(treatment)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }



    return (
        <div className="flex flex-col gap-2 px-5 py-5 xl:px-32">
            <div className="text-xs">&gt; <Link href="/" className="text-blue-700">Home</Link> &gt; <Link href="/treatments" className="text-blue-700">Treatments</Link> &gt; <Link href={`/treatments/${treatment._id}`} className="text-blue-700">{treatment.name}</Link></div>
            <div className="bg-blue-700 text-white p-4 space-y-4 rounded-xl">
                <div className="flex gap-4">
                    <Image src={treatmentImage} alt="" className="size-7" />
                    <p className="text-xl font-semibold">{treatment.name}</p>
                </div>
                <p className="text-xs text-justify">{treatment.description}</p>
            </div>
            <h1 className="font-semibold text-xl">Doctors</h1>
            <div className="grid grid-cols-1">
                {doctors.map((doctor) =>
                    <div key={doctor._id} className="flex bg-white gap-4 p-2 border border-blue-700 rounded-xl">
                        <Image src={doctorImage} className="size-20 object-cover object-top rounded-full" alt="" />
                        <div className="flex items-center justify-between gap-5">
                            <div>
                                <p className="text-xs ">{doctor.specialization}</p>
                                <p className=" text-2xl font-semibold">{doctor.name}</p>
                                <p className="text-xs ">{doctor.contact}</p>
                            </div>
                            <button className="bg-blue-700 px-2 py-1 rounded-md text-white">Book</button>
                        </div>
                    </div>
                )}


            </div>

        </div>
    )
}