import Link from "next/link";
import Image from "next/image";
import youtube from "@/public/youtube.png"
import X from "@/public/twitter.png"
import facebook from "@/public/facebook.png"
import instagram from "@/public/instagram.png"
import linkedIn from "@/public/linkedin.png"


export default function Footer() {
    return (
        <>
            <div className="bg-blue-700 text-white py-2 px-5 md:px-10 xl:px-32">
                <div className="flex flex-col md:flex-row-reverse md:justify-around md:py-4 lg:py-10">

                    <div className="flex flex-col gap-5 lg:w-2/3">

                        <h3>Mail us for more information.</h3>
                        <input type="text" placeholder="Your E-mail" className="p-2 rounded placeholder:text-xs" />
                        <textarea name="" id="" placeholder="Your Message" className="p-2 rounded placeholder:text-xs"></textarea>
                        <button className="border-2 py-2 text-center lg:w-1/3 lg:mx-auto">Submit</button>

                    </div>
                    <div className="flex justify-between py-4 md:flex-col md:py-0">

                        <div className="flex flex-col w-full">
                            <h2 className="hidden md:block font-semibold pb-2">Links</h2>
                            <div className="flex justify-between">
                                <Link href="/" className="hover:underline md:pb-2">Home</Link>
                                <div className="flex items-center gap-4 h-5 md:hidden">
                                    <Link href={'https://www.instagram.com/'} className="w-5 md:w-7"><Image src={instagram} alt="instagram Logo" className="lg:hover:scale-125" /></Link>
                                    <Link href={'https://www.facebook.com/'} className="w-5 md:w-6"><Image src={facebook} alt="facebook Logo" className="lg:hover:scale-125" /></Link>
                                    <Link href={'https://www.x.com/'} className="w-4 md:w-5"><Image src={X} alt="X Logo" className="lg:hover:scale-125" /></Link>
                                    <Link href={'https://www.in.linkedin.com/'} className="w-5 md:w-6"><Image src={linkedIn} alt="LinkedIn Logo" className="lg:hover:scale-125" /></Link>
                                    <Link href={'https://www.youtube.com/'} className="w-5 md:w-6"><Image src={youtube} alt="Youtube Logo" className="lg:hover:scale-125" /></Link>
                                </div>
                            </div>

                            <Link href="/doctors" className="hover:underline md:pb-2">Doctors</Link>
                            <Link href="/treatments" className="hover:underline md:pb-2">Treatments</Link>
                            <Link href="/bookings/new" className="hover:underline ">Request an Appointment</Link>
                        </div>
                        <div className="hidden md:flex items-center gap-4 h-5">
                            <Link href={'https://www.instagram.com/'} className="w-5 md:w-7"><Image src={instagram} alt="instagram Logo" className="lg:hover:scale-125" /></Link>
                            <Link href={'https://www.facebook.com/'} className="w-5 md:w-6"><Image src={facebook} alt="facebook Logo" className="lg:hover:scale-125" /></Link>
                            <Link href={'https://www.x.com/'} className="w-4 md:w-5"><Image src={X} alt="X Logo" className="lg:hover:scale-125" /></Link>
                            <Link href={'https://www.in.linkedin.com/'} className="w-5 md:w-6"><Image src={linkedIn} alt="LinkedIn Logo" className="lg:hover:scale-125" /></Link>
                            <Link href={'https://www.youtube.com/'} className="w-5 md:w-6"><Image src={youtube} alt="Youtube Logo" className="lg:hover:scale-125" /></Link>
                        </div>

                    </div>

                </div>

                <div className="p-2 text-center text-xs font-mono">
                    <span >© 2025 Holy Memorial Hospital. All rights reserved.</span><br />
                    <span>Privacy Policy | Terms of Service | Contact Us</span>
                </div>

            </div>
        </>
    )
}