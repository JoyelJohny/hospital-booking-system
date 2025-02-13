"use client"

import Image from "next/image";
import Loading from "@/app/(components)/LoadingComponent";
import SearchBar from "@/app/(components)/SearchBarComponent";
import Link from "next/link";
import { useEffect, useState } from "react"
import cardiology from '@/public/treatments.png'

interface Treatment {
    _id: string,
    name: string,
}

const api_url = process.env.NEXT_PUBLIC_API_URI

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

    const handleSearch = () => { }
    return (
        <div className="flex flex-col gap-2 px-5 py-5 lg:px-10 xl:px-32">
            <div className="text-xs pb-2">&gt; <Link href="/" className="text-blue-700">Home</Link> &gt; <Link href="/treatments" className="text-blue-700">Treatments</Link></div>
            <SearchBar placeHolder="Search for Treatmens" searchAction={handleSearch} />
            <h1 className="text-3xl font-semibold ">Our Treatments</h1>
            <div className="grid grid-cols-1 pt-2 pb-10 gap-5 md:grid-cols-2">
                <button className="flex flex-col bg-blue-700 gap-4 p-4 border border-blue-700 rounded-xl text-white">
                    <div className="flex gap-2 items-center lg:gap-8">
                        <Image src={cardiology} alt="" className="size-7 lg:size-16" />
                        <p className="text-xl font-semibold lg:text-2xl">Cardiology</p>
                    </div>
                </button>

            </div>
        </div>
    )
}