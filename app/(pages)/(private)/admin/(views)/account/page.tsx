'use client'
import { signOut } from "next-auth/react"
import Image from "next/image"
import editIcon from '@/public/pencil.png'
export default function Account() {
    return (
        <div className="flex flex-col h-full bg-slate-800">
            <div className="h-[8%] w-full px-5 py-2  rounded-b-lg lg:hidden">
                <div className="flex  gap-2 items-center justify-start">

                    <div className="text-lg font-semibold text-nowrap text-white">Holy Memorial Hospital</div>
                </div>
            </div>
            <div className="h-[92%] p-2 lg:h-full">
                <div className="relative flex flex-col h-full gap-2 px-3 py-3  rounded-md bg-white overflow-hidden space-y-5 lg:px-5 lg:py-5">

                    <h1 className="text-slate-800 text-lg font-semibold lg:text-2xl">Manage Account</h1>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold">Username</span>
                        <div className="flex gap-2 items-center">
                            <input type="text" value={'Admin123'} readOnly className="text-sm p-3 border-2 w-full border-slate-800 rounded-md focus:outline-none" />
                            <Image src={editIcon} alt="" className="size-5 mx-2 hover:cursor-pointer" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold">Email</span>
                        <div className="flex gap-2 items-center">
                            <input type="text" value={'Admin123@gmail.com'} readOnly className="text-sm p-3 border-2 w-full border-slate-800 rounded-md focus:outline-none" />
                            <Image src={editIcon} alt="" className="size-5 mx-2 hover:cursor-pointer" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold">Password</span>
                        <div className="flex gap-2 items-center">
                            <input type="password" value={'Admin123@gmail.com'} readOnly className="text-sm p-3 border-2 w-full border-slate-800 rounded-md focus:outline-none" />
                            <Image src={editIcon} alt="" className="size-5 mx-2 hover:cursor-pointer" />
                        </div>
                    </div>

                    <button className="w-fit px-4 py-2 text-sm text-white bg-slate-800 rounded-md" onClick={() => signOut({ callbackUrl: '/admin' })}>Logout</button>



                </div>
            </div>
        </div>

    )
}