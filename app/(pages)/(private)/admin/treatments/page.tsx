import Image from "next/image"
import create from "@/public/write.png"
import edit from "@/public/edit-text.png"
import bin from "@/public/bin.png"

export default function Treatment() {
    return (<>
        <div className=" px-40 py-10">
            <div className="grid grid-cols-2 gap-10 w-full h-full place-content-center ">

                <div className="flex flex-col bg-[#086788] p-6 justify-center rounded-3xl font-semibold ">
                    <div className="flex justify-between">
                        <h2 className="text-xl p-1">Cardiology</h2>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 hover:bg-green-400 p-2 rounded-xl"><Image src={edit} width={24} height={24} alt="edit button image" /></button>
                            <button className="w-10 h-10 hover:bg-red-400 p-2 rounded-xl"><Image src={bin} width={24} height={24} alt="delete button image" /></button>
                        </div>
                    </div>


                    <p className="py-2">Cardiology is a medical specialty focused on diagnosing, treating, and preventing heart and blood vessel disorders. It includes conditions like heart attacks, arrhythmias, heart failure, and hypertension. Cardiologists use various diagnostic tools and therapies to manage cardiovascular health, aiming to improve patient outcomes and overall heart health.</p>

                </div>

            </div>
            <button className="bg-white w-20 h-20 fixed bottom-20 right-20 rounded-full p-5 shadow-md shadow-black">
                <Image src={create} width={64} height={64} className="text-white" alt="create button image" />
            </button>
        </div>
    </>)
}