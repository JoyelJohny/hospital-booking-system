"use client"
import Image from "next/image"
import create from "@/public/write.png"
import edit from "@/public/edit-text.png"
import bin from "@/public/bin.png"
import { useEffect, useState } from "react"
import Form from "next/form"

interface Treatments {
    _id: string,
    name: string,
    description: string
}

export default function Treatment() {

    const [treatments, setTreatments] = useState<Treatments[]>([])
    const [createTreatmentModal, setCreateTreatmentModal] = useState(false)
    const [updateTreatmentModal, setUpdateTreatmentModal] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem('token')
        async function getData() {
            try {
                const res = await fetch("http://localhost:3000/api/v1/private/treatments", { method: "GET", headers: { auth: `Bearer ${token}` } })
                const result = await res.json()
                console.log(result)
                setTreatments(result)

            } catch (error) {

            }
        }
        getData()
    }, [])

    const han = () => { console.log("hello") }

    return (<>
        <div className=" px-40 py-10">

            <div className="grid grid-cols-2 gap-10 w-full h-full place-content-center ">
                {treatments && treatments.map((treatment) => (
                    <div key={treatment._id} className="flex flex-col bg-[#086788] p-6 justify-center rounded-3xl font-semibold ">
                        <div className="flex justify-between">
                            <h2 className="text-xl p-1">{treatment.name}</h2>
                            <div className="flex gap-2">
                                <button onClick={() => setUpdateTreatmentModal(!updateTreatmentModal)} className="w-10 h-10 hover:bg-green-400 p-2 rounded-xl"><Image src={edit} width={24} height={24} alt="edit button image" /></button>
                                <button className="w-10 h-10 hover:bg-red-400 p-2 rounded-xl"><Image src={bin} width={24} height={24} alt="delete button image" /></button>
                            </div>
                        </div>


                        <p className="py-2">{treatment.description}</p>

                    </div>
                ))}



            </div>
            {createTreatmentModal && (<Form action={han} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center bg-black p-6 rounded-lg space-y-5">
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Treatment</label>
                    <input type="text" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Treatment ID</label>
                    <span>123123123123131231</span>
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Description</label>
                    <textarea className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-around gap-2">
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent">Create</button>
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-red-400 hover:border-transparent" onClick={() => setCreateTreatmentModal(!createTreatmentModal)}>Cancel</button>
                </div>
            </Form>)}

            {updateTreatmentModal && (<Form action={han} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center bg-black p-6 rounded-lg space-y-5">
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Treatment</label>
                    <input type="text" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Treatment ID</label>
                    <span>123123123123131231</span>
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Description</label>
                    <textarea className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-around gap-2">
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent">Update</button>
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-red-400 hover:border-transparent" onClick={() => setUpdateTreatmentModal(!updateTreatmentModal)}>Cancel</button>
                </div>
            </Form>)}

            <button onClick={() => setCreateTreatmentModal(!createTreatmentModal)} className="bg-white w-20 h-20 fixed bottom-20 right-20 rounded-full p-5 shadow-md shadow-black">
                <Image src={create} width={64} height={64} className="text-white" alt="create button image" />
            </button>
        </div>
    </>)
}