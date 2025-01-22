'use client'
import Image from "next/image"
import logout from '@/public/logout.png'
import { useRouter } from "next/navigation"

type childProps = {
    adminPage?: (b: boolean) => void
}

const api_url = process.env.NEXT_PUBLIC_API_URI

export default function Logout({ adminPage }: childProps) {

    const router = useRouter()
    const handleClick = async () => {
        try {
            const res = await fetch(`${api_url}/api/v1/private/admin/logout`, { method: 'DELETE' })
            await res.json()
            if (adminPage) {
                adminPage(false)
            } else {
                router.push('/admin')
            }
        } catch (error) {
            console.error(error)
        }

    }
    return (<>
        <button title="click to logout" onClick={handleClick} className="bg-[#086788] w-20 h-10 fixed top-24 right-5  rounded-lg  shadow-md shadow-black px-6"><Image src={logout} width={26} height={26} alt="logout button"></Image></button>
    </>)
}