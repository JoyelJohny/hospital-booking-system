import back from "@/public/back.png"
import Form from "next/form";
import Image from "next/image";
type props = {
    prevModal: React.Dispatch<React.SetStateAction<boolean>>,
    currentModal: React.Dispatch<React.SetStateAction<boolean>>,
    nextModal: React.Dispatch<React.SetStateAction<boolean>>,
}
export default function RequestFormSlide3({ prevModal, currentModal, nextModal }: props) {
    const handlePrevButton = () => {
        currentModal(prev => !prev)
        prevModal(prev => !prev)
    }
    const handleNextButton = () => {
        currentModal(prev => !prev)
        nextModal(prev => !prev)
    }
    return (<div className="flex flex-col h-full overflow-hidden">
        <div className="flex  items-center">
            <Image src={back} alt="" className="size-4 hover:cursor-pointer" onClick={handlePrevButton} />
            <p className="flex-grow font-semibold  text-center">Patient Details</p>
            <button className="w-fit bg-blue-700 px-2 py-1 rounded-md text-white text-xs" onClick={handleNextButton}>Next</button>
        </div>
        <Form action={(e) => console.log(e.values)} className="flex flex-grow flex-col justify-around text-xs">
            <div className="flex justify-between items-center">
                <label className="w-20 font-semibold">Name</label>
                <input type="text" className="border w-full p-1 rounded-md border-blue-700 focus:outline-none" />
            </div>
            <div className="flex justify-between  items-center">

                <label className="font-semibold">Age</label>
                <input type="text-center" pattern="" className="border rounded-md w-8 p-1 border-blue-700 focus:outline-none" />


                <label className="font-semibold">Gender</label>
                <select name="" id="" className="border w-20 rounded-md p-1 border-blue-700 focus:outline-none">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select>



            </div>

            <div className="flex justify-between items-center">
                <label className="w-20 font-semibold">DOB</label>
                <input type="text" className="border w-full rounded-md p-1 border-blue-700 focus:outline-none" />
            </div>

            <div className="flex justify-between items-center">
                <label className="w-20 font-semibold">Phone</label>
                <input type="text" className="border w-full rounded-md p-1 border-blue-700 focus:outline-none" />
            </div>
            <div className="flex justify-between items-center">
                <label className="w-20 font-semibold">Email</label>
                <input type="text" className="border w-full rounded-md p-1 border-blue-700 focus:outline-none" />
            </div>
            <div className="flex flex-col ">
                <label className="font-semibold">Addition Notes <span className="font-normal">(optional)</span></label>
                <textarea name="" id="" className="border rounded-md p-1 border-blue-700 focus:outline-none"></textarea>
            </div>
        </Form>

    </div>)
}