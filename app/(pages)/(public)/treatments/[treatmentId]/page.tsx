"use client"
import Loading from "@/app/(components)/LoadingComponent"
import TreatmentDetailComponent from "@/app/(components)/TreatmentDetailComponent"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

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

const api_url = process.env.NEXT_PUBLIC_API_URI || 'http://localhost:3000'

export default function SpecificTreatment() {
    const [isLoading, setLoading] = useState<boolean>(true)
    const { treatmentId } = useParams<{ treatmentId: string }>()
    const [treatment, setTreatment] = useState<Treatment>({ _id: '', name: '', description: '' })
    const [doctors, setDoctors] = useState<Doctor[]>([])

    useEffect(() => {

        async function getInitialData() {
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
        getInitialData()
    }, [])


    return (<>
        <div className="flex flex-col px-24 py-5  h-full ">
            {isLoading ? <Loading /> : (
                <div className="space-y-4">
                    <TreatmentDetailComponent treatment={treatment}></TreatmentDetailComponent>
                    <h1 className="text-5xl px-6 text-[#086788] font-semibold">Doctors</h1>
                    {doctors.length == 0 &&
                        (<div className="text-[#086788] pt-32 text-center text-3xl ">No Doctors available for this Treatment</div>)}
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
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    </>)
}