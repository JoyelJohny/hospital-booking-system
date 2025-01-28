"use client"
import Image from "next/image"
import logo from "@/public/hospital.png"
import Loading from "@/app/(components)/LoadingComponent"
import Logout from "@/app/(components)/LogoutComponent"
import Message from "@/app/(components)/MessageComponent"
import Form from "next/form"
import Link from "next/link"

import { useEffect, useState } from "react"
import AdminLoginComponent from "@/app/(components)/AdminLoginComponent"
import AdminSignUpComponent from "@/app/(components)/AdminSignUpComponent"
import AdminForgotPasswordComponent from "@/app/(components)/AdminForgotPasswordComponent"

const api_url = process.env.NEXT_PUBLIC_API_URI

export default function Login() {
    const [trigger, setTrigger] = useState(0)
    const [response, setResponse] = useState<{ message: '', messageType: '' } | null>(null)
    const [isLoading, setLoading] = useState<boolean>(true)
    const [showOptionModal, setShowOptionModal] = useState(false)

    useEffect(() => {
        async function isUserLoggedIn() {
            try {
                const res = await fetch(`${api_url}/api/v1/private/admin/login`, { method: "GET" })
                const { userLoggedIn } = await res.json()
                setShowOptionModal(userLoggedIn)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }

        }
        isUserLoggedIn()
    }, [])

    const handleLoginFormSubmit = async (formData: FormData) => {
        const data = JSON.stringify(Object.fromEntries(formData))
        try {
            const res = await fetch(`${api_url}/api/v1/private/admin/login`, { method: "POST", body: data })
            const result = await res.json()
            if (result) {
                setResponse({ message: result.message, messageType: result.messageType })
                setTrigger((prev) => prev + 1)
            }
            if (res.ok) {
                setShowOptionModal(!showOptionModal)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (<>
        <div className="flex flex-col gap-5 px-5 py-5 h-full bg-gradient-to-r from-blue-400 to-blue-700">
            <div className="flex items-center justify-start gap-2">
                <Image src={logo} alt='Hospital Logo' className="size-10" />
                <div className="flex flex-col text-white">
                    <div className="text-xl font-semibold text-nowrap md:text-2xl lg:text-3xl">Holy Memorial Hospital</div>
                    <div className="text-xs font-thin">We Care For You</div>
                </div>
            </div>
            {/* <AdminLoginComponent /> */}
            {/* <AdminSignUpComponent /> */}
            <AdminForgotPasswordComponent />

        </div>



    </>)
}