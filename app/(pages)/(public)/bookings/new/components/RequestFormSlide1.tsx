import DateComponent from "@/app/(components)/DateComponent";
import back from "@/public/back.png"
import Image from "next/image";


type props = {
    formSubmit: (selectedTreatment: string) => void,
    treatments: { _id: string, name: string }[]
    selectedTreatment: string,
    setSelectedTreatment: React.Dispatch<React.SetStateAction<string>>
    getSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>
}

export default function RequestFormSlide1({ treatments, selectedTreatment, setSelectedTreatment, formSubmit, getSelectedDate }: props) {

    return (
        <div className="flex flex-col h-full ">
            <div className="flex  items-center">
                <p className="font-semibold w-full  text-center">Appointment Request</p>
                <Image src={back} alt="" className="size-4 rotate-180 hover:cursor-pointer" onClick={() => formSubmit(selectedTreatment)} />
            </div>
            <div className="flex flex-grow items-center justify-center">
                <div className="flex flex-col text-xs gap-10">
                    <div className="flex  gap-4 items-center">
                        <label htmlFor="">Choose your Treatment</label>
                        <select name="" id="" value={selectedTreatment} onChange={(e) => setSelectedTreatment(e.currentTarget.value)} className="border p-1 rounded-md border-blue-700">
                            {treatments.map((treatment) =>
                                <option key={treatment._id} value={treatment._id}>{treatment.name}</option>
                            )}

                        </select>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <p>Pick a Date</p><DateComponent sendDate={getSelectedDate} className="block" />
                    </div>
                </div>
            </div>

        </div>
    )
}