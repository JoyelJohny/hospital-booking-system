"use client"
import Image from "next/image"
import create from "@/public/write.png"
import treatmentIcon from '@/public/treatments.png'
import add from "@/public/addition.png"
import edit from "@/public/edit-text.png"
import bin from "@/public/bin.png"

import React, { useEffect, useState } from "react"
import Form from "next/form"
import Logout from "@/app/(components)/LogoutComponent"
import Loading from "@/app/(components)/LoadingComponent"
import Message from "@/app/(components)/MessageComponent"
import Link from "next/link"
import SearchBar from "@/app/(components)/SearchBarComponent"
import TreatmentDetailModal from "./Components/TreatmentDetailModal"

interface Treatment {
    _id: string,
    name: string,
    description: string
}

const api_url = process.env.NEXT_PUBLIC_API_URI

export default function Treatment() {
    const [trigger, setTrigger] = useState(0)
    const [response, setResponse] = useState<{ message: '', messageType: '' } | null>(null)
    const [isLoading, setLoading] = useState<boolean>(true)
    const [treatments, setTreatments] = useState<Treatment[]>([])
    const [selectedTreatment, setSelectedTreatment] = useState<Treatment>({ _id: "", name: "", description: "" })
    const [treatmentModal, setTreatmentModal] = useState(false)
    const [createTreatmentModal, setCreateTreatmentModal] = useState(false)
    const [updateTreatmentModal, setUpdateTreatmentModal] = useState(false)




    useEffect(() => {

        getTreatmentsData();

    }, []);

    const getTreatmentsData = async () => {
        try {
            setLoading(true)
            const res = await fetch(
                `${api_url}/api/v1/private/treatments`,
                { method: "GET" })
            const result = await res.json()
            if (result) {
                setTreatments(result)
            }




        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleTreatmentEditButton = (selectedTreatment: Treatment) => {
        setUpdateTreatmentModal(!updateTreatmentModal)
        setSelectedTreatment(selectedTreatment)

    }

    const handleTreatmentUpdateButton = async (formdata: FormData, id: string) => {
        try {
            setUpdateTreatmentModal(!updateTreatmentModal)
            const data = JSON.stringify(Object.fromEntries(formdata))
            const res = await fetch(`${api_url}/api/v1/private/treatments/${id}`, { method: "PATCH", body: data, credentials: 'include' })
            const result = await res.json()
            if (result) {
                setResponse({ message: result.message, messageType: result.messageType })
                setTrigger((prev) => prev + 1)
            }
            getTreatmentsData()
        } catch (error) {
            console.error(error)
        }
    }

    const handleTreatmentEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const { name, value } = e.currentTarget
        setSelectedTreatment((prev) => ({ ...prev, [name]: value }))

    }

    const handleTreatmentDeleteButton = async (id: string) => {
        try {
            const res = await fetch(`${api_url}/api/v1/private/treatments/${id}`, { method: "DELETE", credentials: 'include' })
            const result = await res.json()
            if (result) {
                setResponse({ message: result.message, messageType: result.messageType })
                setTrigger((prev) => prev + 1)
            }
            getTreatmentsData()
        } catch (error) {
            console.error(error)
        }
    }

    const handleTreatmentCreateSubmit = async (formdata: FormData) => {
        try {
            setCreateTreatmentModal(!createTreatmentModal)
            const data = JSON.stringify(Object.fromEntries(formdata))
            const res = await fetch(`${api_url}/api/v1/private/treatments`, { method: "POST", body: data, credentials: 'include' })
            const result = await res.json()
            if (result) {
                setResponse({ message: result.message, messageType: result.messageType })
                setTrigger((prev) => prev + 1)
            }
            getTreatmentsData()
        } catch (error) {
            console.error(error)
        }
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
                        <h1 className="text-slate-800 text-lg font-semibold lg:text-2xl">Manage Treatments</h1>
                        <div className="flex gap-2">
                            <SearchBar
                                placeHolder="Search Treatments"
                                searchAction={console.log}
                                searchBoxStyling="flex h-8"
                                textBoxStyling="w-full py-1 px-3 text-xs focus:outline-none border border-r-0 rounded-l-full border-slate-700"
                                searchButtonStyling="flex border border-slate-800 bg-slate-800 rounded-r-full items-center justify-center w-12"
                            />
                            <button className="text-white text-xs bg-slate-800 rounded-md w-fit px-1">Add Treatment</button>
                        </div>

                        <div className="flex text-sm justify-between items-center">

                            <span>Treatments</span>

                            <span className="p-2">Option</span>
                        </div>
                        <hr className="border-slate-800" />
                    </div>

                    <div className="flex flex-col overflow-auto gap-2">
                        {treatments.map((treatment) =>
                            <div key={treatment._id} className="flex justify-between py-1 px-2 border rounded-lg bg-slate-800 text-sm items-center">
                                <div className="flex gap-2">
                                    <div className="flex flex-col justify-between gap-2 text-white">
                                        <div className="flex gap-2 items-center">
                                            <Image src={treatmentIcon} alt="" className=" size-8 " />
                                            <span className="font-semibold text-lg">{treatment.name}</span>
                                        </div>
                                        <p className="text-xs text-white leading-1 text-justify">{treatment.description}</p>
                                    </div>
                                    <button className="text-xs text-white border border-white font-semibold px-4 w-fit py-1 h-fit bg-slate-800 rounded-md" onClick={() => setTreatmentModal(prev => !prev)}>Edit</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {treatmentModal && <TreatmentDetailModal discard={setTreatmentModal} />}

                </div>
            </div>
        </div>)
    {/* // <div className="flex flex-col px-5 py-5 h-full gap-4 lg:px-10 xl:px-32">
    //     <div className="text-xs">&gt; <Link href="/admin/dashboard" className="text-blue-700">Home</Link> &gt; <Link href="/admin/treatments" className="text-blue-700">Treatments</Link></div>
    //     <div className="flex justify-between items-center">
    //         <h1 className="text-blue-700 font-semibold text-3xl md:text-4xl lg:text-5xl">Treatments List</h1>
    //         <div className="flex items-center gap-2 border p-1 rounded-lg border-blue-700 lg:hover:cursor-pointer lg:hover:scale-110 ">
    //             <Image src={add} alt="" className="size-6 lg:hover:cursor-pointer lg:hover:scale-110" />
    //             <span className="text-blue-700 font-semibold my-auto text-xs lg:text-sm">Add Treatment</span>
    //         </div>

    //     </div>

    //     <div className="grid grid-cols-1 gap-4 text-white md:grid-cols-2 md:gap-4 xl:gap-6 xl:grid-cols-3 mt-5">
    //         <div className="flex flex-col bg-blue-600 w-full rounded-md p-4 space-y-4">
    //             <div className="flex justify-between">
    //                 <div className="flex gap-2 items-center">
    //                     <Image src={treatmentIcon} alt="" className="size-7" />
    //                     <p className="text-xl font-semibold">Cardiology</p>
    //                 </div>

    //                 <div className="flex gap-4 justify-between items-center">
    //                     <Image src={edit} alt="" className="size-6 lg:hover:cursor-pointer lg:hover:scale-110" />
    //                     <Image src={bin} alt="" className="size-6 lg:hover:cursor-pointer lg:hover:scale-110" />
    //                 </div>


    //             </div>
    //             <p className="text-xs text-justify">Focuses on diagnosing and treating heart and blood vessel disorders, including heart attacks, arrhythmias, and hypertension. Cardiologists often perform diagnostic tests like ECGs and echocardiograms. Interventional cardiology may include procedures like angioplasty or stenting.</p>

    //         </div>
    //     </div>
    // </div>) */}

    {/* <div className="flex flex-col px-40 py-5 h-full space-y-5">

            <h1 className="text-[#086788] text-5xl px-6 font-semibold">Treatments</h1>
            {isLoading ? <Loading /> : (
                <div>
                    {treatments.length == 0 && (
                        <div className="text-[#086788] pt-44 text-center text-3xl ">No Treatments have been created</div>)}
                    <div className="grid grid-cols-2 gap-10 w-full h-full place-content-center ">
                        {Array.isArray(treatments) && treatments.map((treatment) => (
                            <div key={treatment._id} className="flex flex-col bg-[#086788] p-6 justify-center rounded-3xl font-semibold ">
                                <div className="flex justify-between">
                                    <h2 className="text-xl p-1">{treatment.name}</h2>
                                    <div className="flex gap-2">
                                        <button title='Edit this Treatment' onClick={() => handleTreatmentEditButton(treatment)} className="w-10 h-10 hover:bg-green-400 p-2 rounded-xl"><Image src={edit} width={24} height={24} alt="edit button image" /></button>
                                        <button title="Delete this Treatment" onClick={() => handleTreatmentDeleteButton(treatment._id)} className="w-10 h-10 hover:bg-red-400 p-2 rounded-xl"><Image src={bin} width={24} height={24} alt="delete button image" /></button>
                                    </div>
                                </div>
                                <p className="py-2">{treatment.description}</p>
                            </div>
                        ))}
                    </div>
                </div>)} */}

    {/* {createTreatmentModal && (<Form action={handleTreatmentCreateSubmit} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center border-4 border-gray-100 bg-[#086788] p-6 rounded-lg space-y-5 w-1/3">
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm w-24">Treatment</label>
                    <input type="text" name="name" className="text-black p-2 rounded-md focus:outline-slate-500 w-full" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm ">Description</label>
                    <textarea name="description" className="text-black p-2 rounded-md focus:outline-slate-500 w-full" />
                </div>
                <div className="flex justify-around gap-2">
                    <button type="submit" className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent">Create</button>
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-red-400 hover:border-transparent" onClick={() => setCreateTreatmentModal(!createTreatmentModal)}>Cancel</button>
                </div>
            </Form>)} */}

    {/* {updateTreatmentModal && (<Form action={(e) => handleTreatmentUpdateButton(e, selectedTreatment._id)} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center border-4 border-gray-100 bg-[#086788] p-6 rounded-lg space-y-5 w-1/3">
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm w-24">Treatment</label>
                    <input type="text" name="name" value={selectedTreatment.name} onChange={handleTreatmentEditInputChange} className="text-black p-2 rounded-md focus:outline-slate-500 w-full" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Description</label>
                    <textarea name="description" value={selectedTreatment.description} onChange={handleTreatmentEditInputChange} className="text-black p-2 rounded-md focus:outline-slate-500 w-full" />
                </div>
                <div className="flex justify-around gap-2">
                    <button type="submit" className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent" >Update</button>
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-red-400 hover:border-transparent" onClick={() => setUpdateTreatmentModal(!updateTreatmentModal)}>Cancel</button>
                </div>
            </Form>)} */}

    {/* <button title="Create new Treatment" onClick={() => setCreateTreatmentModal(!createTreatmentModal)} className=" w-20 h-20 fixed bottom-20 right-20 rounded-full p-5 shadow-md shadow-black bg-[#086788]">
                <Image src={create} width={64} height={64} alt="create button image" />
            </button>
            <Logout />
            {response && <Message trigger={trigger} message={response.message} messageType={response.messageType} />}
        </div> */}

}