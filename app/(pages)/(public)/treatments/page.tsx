"use client"

import Loading from "@/app/(components)/LoadingComponent";
import Link from "next/link";
import { useEffect, useState } from "react"

interface Treatment {
    _id: string,
    name: string,
}

const api_url = process.env.NEXT_PUBLIC_API_URI || 'http://localhost:3000'

export default function Treatment() {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [treatments, setTreatments] = useState<Treatment[]>([]);
    useEffect(() => {
        async function getTreatmentsData() {
            try {
                const res = await fetch(`${api_url}/api/v1/public/treatments`, {
                    method: "GET"
                })
                const result = await res.json()
                setTreatments(result)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getTreatmentsData()
    }, [])

    return (<>
        <div className="flex flex-col px-24 py-5 space-y-4 h-full">
            <h1 className="text-[#086788] text-5xl px-6 font-semibold">Treatments</h1>
            {isLoading ? <Loading /> : (
                <div>
                    {treatments.length == 0 && (
                        <div className="text-[#086788] pt-44 text-center text-3xl ">No Treatments have been created</div>)}
                    <div className="grid grid-cols-2 gap-5 py-6">
                        {treatments.map((treatment) => (
                            <Link href={`/treatments/${treatment._id}`} key={treatment._id} className="flex bg-[#086788] p-6 justify-center rounded-3xl text-4xl font-semibold hover:bg-green-400">{treatment.name}</Link>
                        ))
                        }
                    </div>
                </div>)}
        </div>
    </>
    )
}