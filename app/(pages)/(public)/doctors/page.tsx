'use client'
import SearchBar from "@/app/(components)/SearchBarComponent";
import Image from "next/image";
import doctor from "@/public/doctor.jpg"
import { useState } from "react";
import Link from "next/link";

export default function Doctors() {
    const [selectedOption, setSelectedOption] = useState('All')
    const handleSearchBar = () => {

    }
    return (
        <div className="flex flex-col gap-2 px-5 py-5 lg:px-10 xl:px-32">
            <div className="text-xs pb-2">&gt; <Link href="/" className="text-blue-700">Home</Link> &gt; <Link href="/doctors" className="text-blue-700">Doctors</Link></div>
            <SearchBar searchAction={handleSearchBar} placeHolder="Search for Doctors" />
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold ">Our Doctors</h1>
                <div className="flex gap-2 items-center text-xs lg:hidden">
                    <p>List By</p>
                    <select value={selectedOption} onChange={(e) => setSelectedOption(e.currentTarget.value)} className="border border-blue-700 px-2 py-1 rounded-full">
                        <option value="All">All</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="csdf">csdf</option>
                    </select>
                </div>
            </div>
            <div className="flex">
                <div className="hidden lg:block pr-5 pl-2 py-2 text-xs space-y-1 min-w-60">
                    <h2 className="text-lg">Categories</h2>
                    <p className="hover:underline">All</p>
                    <p>Cardiology</p>
                    <p>lsdkjflkasdjlfkjalskd</p>
                </div>
                <div className="grid grid-cols-1 w-full gap-4 pt-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div className="flex bg-white gap-4 p-2 border border-blue-700 rounded-xl lg:flex-col">
                        <Image src={doctor} className="size-20 object-cover object-top rounded-full lg:rounded-xl lg:size-60" alt="" />
                        <div className="flex items-center justify-between gap-10 md:gap-5 lg:flex-col lg:items-start">
                            <div>
                                <p className="text-xs ">Cardiology</p>
                                <p className=" text-xl font-semibold">Dr Arun Joseph</p>
                                <p className="text-xs ">arunjoseph123@gmail.com</p>
                            </div>
                            <button className="flex bg-blue-700 px-2 py-1 rounded-md text-white w-fit lg:mx-auto ">Book <span className="hidden lg:block">&nbsp; an Appointment</span></button>
                        </div>
                    </div>

                </div>
            </div>



        </div>)
}