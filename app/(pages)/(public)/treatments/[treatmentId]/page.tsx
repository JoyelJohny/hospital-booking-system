"use client"
import TreatmentDetailComponent from "@/app/(components)/TreatmentDetailComponent"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

interface Doctor {
    _id: string,
    name: string,
    specialization: string
    contact: string
}

export default function SpecificTreatment() {
    const { treatmentId } = useParams<{ treatmentId: string }>()
    const [treatment, setTreatment] = useState<{ _id: string, name: string, description: string }>()
    const [doctors, setDoctors] = useState<Doctor[]>([])

    useEffect(() => {
        async function getdata() {
            try {
                const res = await fetch(`http://localhost:3000/api/v1/public/treatments/${treatmentId}/doctors`, { method: "GET" })
                const { doctorsList, treatment } = await res.json()
                setDoctors(doctorsList)
                setTreatment(treatment)
            } catch (error) {
                console.log(error)
            }

        }
        getdata()
    }, [])
    console.log(doctors)
    console.log(treatmentId)

    return (<>
        <div className="px-24 py-5 space-y-4  h-full ">
            <TreatmentDetailComponent treatment={treatment}></TreatmentDetailComponent>
            <h1 className="text-5xl px-6 text-[#086788] font-semibold">Doctors</h1>
            <div className="grid grid-cols-3 w-full gap-6 justify-between">
                {doctors && doctors.map((doctor) => (
                    <div key={doctor._id} className="rounded-xl px-6 py-4 bg-[#086788] border-2">
                        <p className="text-2xl font-bold">{doctor.name}</p>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm">{doctor.specialization}</p>
                                <p className="text-xs">{doctor.contact}</p>
                            </div>
                            <Link href={`/doctors/${doctor._id}/availability`} className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent">Check availability</Link>

                        </div>
                    </div>))}




            </div>

        </div>
    </>)
}