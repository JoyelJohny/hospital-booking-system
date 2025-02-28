import DateComponent from "@/app/(components)/DateComponent";
import back from "@/public/back.png"
import Image from "next/image";


type props = {
    currentModal: React.Dispatch<React.SetStateAction<boolean>>,
    nextModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RequestFormSlide1({ currentModal, nextModal }: props) {
    const handleNextButton = () => {
        currentModal(prev => !prev)
        nextModal(prev => !prev)
    }
    return (
        <div className="flex flex-col h-full ">
            <div className="flex  items-center">
                <p className="font-semibold w-full  text-center">Appointment Request</p>
                <Image src={back} alt="" className="size-4 rotate-180 hover:cursor-pointer" onClick={handleNextButton} />
            </div>
            <div className="flex flex-grow items-center justify-center">
                <div className="flex flex-col text-xs gap-10">
                    <div className="flex  gap-4 items-center">
                        <label htmlFor="">Choose your Treatment</label>
                        <select name="" id="" className="border p-1 rounded-md border-blue-700">
                            <option value="Cardiology">Cardiology</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <p>Pick a Date</p><DateComponent className="block" />
                    </div>
                </div>
            </div>

        </div>
    )
}