"use client"
import Image from "next/image"
import create from "@/public/write.png"
import edit from "@/public/edit-text.png"
import bin from "@/public/bin.png"
import React, { useEffect, useState } from "react"
import Form from "next/form"
import { useRouter } from "next/navigation"
import Logout from "@/app/(components)/LogoutComponent"

interface Treatments {
    _id: string,
    name: string,
    description: string
}

export default function Treatment() {
    const router = useRouter()
    const token = localStorage.getItem('token')
    const [treatments, setTreatments] = useState<Treatments[]>([])
    const [selectedTreatment, setSelectedTreatment] = useState<Treatments>({ _id: "", name: "", description: "" })
    const [createTreatmentModal, setCreateTreatmentModal] = useState(false)
    const [updateTreatmentModal, setUpdateTreatmentModal] = useState(false)
    useEffect(() => {
        getTreatmentsData()

    }, [])

    const getTreatmentsData = async () => {
        try {
            const res = await fetch(
                "http://localhost:3000/api/v1/private/treatments",
                { method: "GET", headers: { auth: `Bearer ${token}` } })
            const result = await res.json()

            if (!res.ok) {

                router.back()

            } else {
                setTreatments(result)
            }

        } catch (error) {

        }
    }



    const handleEditButton = (selectedTreatment: Treatments) => {
        setSelectedTreatment(selectedTreatment)
        setUpdateTreatmentModal(!updateTreatmentModal)
    }

    const handleUpdateButton = async (formdata: FormData, id: string) => {
        try {
            setUpdateTreatmentModal(!updateTreatmentModal)
            const data = JSON.stringify(Object.fromEntries(formdata))
            const res = await fetch(`http://localhost:3000/api/v1/private/treatments/${id}`, { method: "PATCH", body: data, headers: { auth: `Bearer ${token}` } })
            const result = await res.json()
            getTreatmentsData()
        } catch (error) {

        }
    }

    const handleEditChange = (e: React.ChangeEvent<any>) => {

        const { name, value } = e.currentTarget
        setSelectedTreatment((prev) => ({ ...prev, [name]: value }))

    }

    const handleDeleteButton = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:3000/api/v1/private/treatments/${id}`, { method: "DELETE", headers: { auth: `Bearer ${token}` } })
            const result = await res.json()
            console.log(result)
            getTreatmentsData()
        } catch (error) {

        }
    }

    const handleCreateSubmit = async (formdata: FormData) => {
        setCreateTreatmentModal(!createTreatmentModal)
        const data = JSON.stringify(Object.fromEntries(formdata))
        try {
            const res = await fetch('http://localhost:3000/api/v1/private/treatments', { method: "POST", body: data, headers: { auth: `Bearer ${token}` } })
            const { message, treatment } = await res.json()
            console.log(treatment)
            getTreatmentsData()
        } catch (error) {

        }
    }

    return (<>
        <div className=" px-40 py-10">

            <div className="grid grid-cols-2 gap-10 w-full h-full place-content-center ">
                {Array.isArray(treatments) && treatments.map((treatment) => (
                    <div key={treatment._id} className="flex flex-col bg-[#086788] p-6 justify-center rounded-3xl font-semibold ">
                        <div className="flex justify-between">
                            <h2 className="text-xl p-1">{treatment.name}</h2>
                            <div className="flex gap-2">
                                <button onClick={() => handleEditButton(treatment)} className="w-10 h-10 hover:bg-green-400 p-2 rounded-xl"><Image src={edit} width={24} height={24} alt="edit button image" /></button>
                                <button onClick={() => handleDeleteButton(treatment._id)} className="w-10 h-10 hover:bg-red-400 p-2 rounded-xl"><Image src={bin} width={24} height={24} alt="delete button image" /></button>
                            </div>
                        </div>


                        <p className="py-2">{treatment?.description}</p>

                    </div>
                ))}



            </div>
            {createTreatmentModal && (<Form action={handleCreateSubmit} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center bg-black p-6 rounded-lg space-y-5">
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Treatment</label>
                    <input type="text" name="name" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Description</label>
                    <textarea name="description" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-around gap-2">
                    <button type="submit" className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent">Create</button>
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-red-400 hover:border-transparent" onClick={() => setCreateTreatmentModal(!createTreatmentModal)}>Cancel</button>
                </div>
            </Form>)}

            {updateTreatmentModal && (<Form action={(e) => handleUpdateButton(e, selectedTreatment._id)} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center bg-black p-6 rounded-lg space-y-5">
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Treatment Name</label>
                    <input type="text" name="name" value={selectedTreatment.name} onChange={handleEditChange} className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Treatment ID</label>
                    <span>{selectedTreatment._id}</span>
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Description</label>
                    <textarea name="description" value={selectedTreatment.description} onChange={handleEditChange} className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-around gap-2">
                    <button type="submit" className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent" >Update</button>
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-red-400 hover:border-transparent" onClick={() => setUpdateTreatmentModal(!updateTreatmentModal)}>Cancel</button>
                </div>
            </Form>)}

            <button onClick={() => setCreateTreatmentModal(!createTreatmentModal)} className="bg-white w-20 h-20 fixed bottom-20 right-20 rounded-full p-5 shadow-md shadow-black">
                <Image src={create} width={64} height={64} className="text-white" alt="create button image" />
            </button>
            <Logout />
        </div>
    </>)
}