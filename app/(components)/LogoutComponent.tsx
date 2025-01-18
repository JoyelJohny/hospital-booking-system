'use client'
import Image from "next/image"
import logout from '@/public/logout.png'
import { useRouter } from "next/navigation"

type childProps = {
    adminPage?: (b: boolean) => void
}

export default function Logout({ adminPage }: childProps) {

    const router = useRouter()
    const handleClick = () => {
        localStorage.removeItem('token')
        if (adminPage) {
            adminPage(false)
        } else { router.push('/admin') }

    }
    return (<>
        <button title="click to logout" onClick={handleClick} className="bg-[#086788] w-20 h-10 fixed top-24 right-5  rounded-lg  shadow-md shadow-black px-6"><Image src={logout} width={26} height={26} alt="logout button"></Image></button>
    </>)
}