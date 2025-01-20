"use client"
import Logout from "@/app/(components)/LogoutComponent"
import Form from "next/form"
import Link from "next/link"

import { useEffect, useState } from "react"

export default function Login() {
    const [showOptionModal, setShowOptionModal] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setShowOptionModal(!showOptionModal)
        }
    }, [])

    const handleLoginFormSubmit = async (formData: FormData) => {
        const data = JSON.stringify(Object.fromEntries(formData))
        try {
            const res = await fetch("http://localhost:3000/api/v1/private/admin/login", { method: "POST", body: data })
            const result = await res.json()
            if (result.token) {
                localStorage.setItem('token', result.token)
                setShowOptionModal(!showOptionModal)

            } else {
                console.error('Invalid username or password')
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (<>
        <div className="px-24">

            {showOptionModal && (<div className="grid grid-cols-2 gap-20 w-full h-full place-content-center my-32">
                <Link href="/admin/treatments" className="flex bg-[#086788] p-6 justify-center rounded-3xl text-4xl font-semibold hover:bg-green-400">Treatments</Link>
                <Link href="/admin/doctors" className="flex bg-[#086788] p-6 justify-center rounded-3xl text-4xl font-semibold hover:bg-green-400">Doctors</Link>
                <Link href="/admin/bookings" className="flex bg-[#086788] p-6 justify-center rounded-3xl text-4xl font-semibold hover:bg-green-400">Bookings</Link>
                <Link href="/admin/cancellations" className="flex bg-[#086788] p-6 justify-center rounded-3xl text-4xl font-semibold hover:bg-green-400">Cancellations</Link>
            </div>)}

            {!showOptionModal && (<Form action={handleLoginFormSubmit} className="flex flex-col bg-[#086788] p-6 w-fit h-96 shadow-2xl rounded-lg justify-self-center mt-20 justify-between">
                <h1 className=" text-4xl font-semibold my-6">Administrator Login</h1>
                <div className="flex justify-between gap-4">
                    <label className="font-semibold py-2 ">Username</label>
                    <input type="text" required name="username" className="rounded-md text-black p-1 focus:outline-slate-600 w-full" />
                </div>
                <div className=" flex justify-between gap-4">
                    <label className="font-semibold py-2">Password</label>
                    <input type="password" required name="password" className="rounded-md text-black p-1 focus:outline-slate-600 w-full " />

                </div>

                <button type="submit" className="rounded-md  px-4 py-2 my-4 border-2 border-white text-2xl font-semibold hover:bg-green-400 hover:border-transparent">Login</button>
            </Form>)}

            {showOptionModal && <Logout adminPage={setShowOptionModal} />}
        </div>



    </>)
}