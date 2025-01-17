"use client"

import Link from "next/link";
import { useEffect, useState } from "react"

interface Treatments {
    _id: string,
    name: string,
}

export default function Treatment() {
    const [data, setData] = useState<Treatments[]>([]);
    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch("http://localhost:3000//api/v1/public/treatments", {
                    method: "GET"
                })
                const result = await res.json()
                setData(result)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    return (<>
        <div className="px-24 py-5 space-y-4 h-full">
            <h1 className="text-[#086788] text-5xl px-6 font-semibold">Treatments</h1>
            <div className="grid grid-cols-2 gap-5 py-6">
                {data.map((treatment) => (
                    <Link href={`/treatments/${treatment._id}`} key={treatment._id} className="flex bg-[#086788] p-6 justify-center rounded-3xl text-4xl font-semibold hover:bg-green-400">{treatment.name}</Link>
                ))
                }
            </div>

        </div>
    </>)
}