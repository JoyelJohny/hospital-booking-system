"use client"
import Image from "next/image"
import logo from "@/public/hospital.png"
// import Loading from "@/app/(components)/LoadingComponent"
// import Logout from "@/app/(components)/LogoutComponent"
// import Message from "@/app/(components)/MessageComponent"
// import Form from "next/form"
// import Link from "next/link"

import { useState } from "react"
import AdminLoginComponent from "@/app/(components)/AdminLoginComponent"
import AdminSignUpComponent from "@/app/(components)/AdminSignUpComponent"
import AdminForgotPasswordComponent from "@/app/(components)/AdminForgotPasswordComponent"
// import AdminOTPVerificationComponent from "@/app/(components)/AdminOTPVerificationComponent"
// import AdminNewPasswordComponent from "@/app/(components)/AdminNewPasswordComponent"
import { signIn } from "next-auth/react"
import MessageComponent from "@/app/(components)/MessageComponent"
import { useRouter } from "next/navigation"

const api_url = process.env.NEXT_PUBLIC_API_URI

export default function Login() {
    const router = useRouter()
    const [loginModal, openLoginModal] = useState(true)
    const [signUpModal, openSignUpModal] = useState(false)
    const [forgotPasswordModal, openForgotPasswordModal] = useState(false)
    const [trigger, setTrigger] = useState(0)
    const [response, setResponse] = useState<{ message: string, messageType: string } | null>(null)
    // const [isLoading, setLoading] = useState<boolean>(true)
    // const [showOptionModal, setShowOptionModal] = useState(false)


    const handleLoginFormSubmit = async (email: string, password: string) => {
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        if (result?.error) {
            const message = (result.error).split(': ')[1]
            setResponse({ message: message, messageType: 'error' })
            setTrigger(prev => prev + 1)
        } else {
            router.push('/admin/dashboard')
        }
    }

    const handleSignupFormSubmit = async (email: string, password: string, username: string) => {
        const res = await fetch(`${api_url}/api/v1/private/admin/sign-up`, { method: 'POST', body: JSON.stringify({ email, username, password }) })
        const result = await res.json()
        if (result.error) {
            setResponse({ message: result.error, messageType: result.messageType })
            setTrigger(prev => prev + 1)
        } else {
            setResponse({ message: result.message, messageType: result.messageType })
            setTrigger(prev => prev + 1)
        }

    }
    return (
        <div className="flex flex-col gap-5 px-5 py-5 h-full bg-gradient-to-r from-blue-400 to-blue-700">
            <div className="flex items-center justify-start gap-2">
                <Image src={logo} alt='Hospital Logo' className="size-10" />
                <div className="flex flex-col text-white">
                    <div className="text-xl font-semibold text-nowrap md:text-2xl lg:text-3xl">Holy Memorial Hospital</div>
                    <div className="text-xs font-thin">We Care For You</div>
                </div>
            </div>
            {loginModal && <AdminLoginComponent handleSignUpModal={openSignUpModal} handleLoginModal={openLoginModal} handleForgotPasswordModal={openForgotPasswordModal} formSubmit={handleLoginFormSubmit} />}
            {signUpModal && <AdminSignUpComponent handleLoginModal={openSignUpModal} handleSignUpModal={openLoginModal} formSubmit={handleSignupFormSubmit} />}
            {forgotPasswordModal && <AdminForgotPasswordComponent handleLoginModal={openLoginModal} handleForgotPasswordModal={openForgotPasswordModal} />}
            {/* <AdminOTPVerificationComponent /> */}
            {/* <AdminNewPasswordComponent /> */}
            {trigger == 0 ? '' : <MessageComponent messageType={response?.messageType} message={response?.message} trigger={trigger} />}
        </div>

    )
}
