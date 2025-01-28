import Image from "next/image"
import home1 from "@/public/home1.jpg"
import Link from "next/link"
export default function MyApp() {
    return (<>
        <div className="flex flex-col gap-5 px-5 py-5 xl:px-32">
            <div className="text-xs">&gt; <Link href="/" className="text-blue-700">Home</Link></div>
            <h1 className="font-bold md:text-3xl">World-class care, Focused on you</h1>
            <div className="space-y-2 lg:space-y-0 lg:flex lg:gap-4">
                <div className="lg:w-2/3">
                    <Image src={home1} alt="Background image" className="object-cover rounded" ></Image>

                </div>
                <div className="text-justify text-sm/6 font-thin space-y-2 lg:text-lg/9 lg:font-thin xl:text-lg/10 lg:w-2/3">
                    <p>Welcome to Holy Memorial Hospital, your trusted partner in health and wellness. We are committed to providing exceptional medical care and a compassionate patient experience.</p>
                    <p className="indent-10">At Holy Memorial Hospital, we prioritize your health through cutting-edge technology, expert medical teams, and personalized care. Visit our website to learn more about how we can support your journey to better health.</p>
                </div>
            </div>


        </div>


        {/* <h1 className="text-center text-9xl font-bold my-40 text-[#086788]"> Hospital Booking System</h1> */}
    </>)
}