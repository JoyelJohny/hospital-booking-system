type props = {
    discard: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function DoctorUpdateModal({ discard }: props) {

    const handleDiscardButton = () => {
        discard(prev => !prev)
    }
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center border border-blue-700 bg-white w-4/5 p-3 rounded-xl space-y-5">
            <div>
                <label htmlFor="profileImage">

                    Hello
                </label>
                <input id="profileImage" type="file" className="bg-blue-700" />

            </div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold">Speciality</p><input type="text" className="border-b focus:outline-none" />
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-nowrap">Doctor Name</p><input type="text" className="border-b focus:outline-none" />
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold">Contact</p><input type="text" className="border-b focus:outline-none" />
                </div>

            </div>
            <div className="flex justify-center gap-10">
                <button className="w-20 border border-transparent rounded-md bg-blue-700 text-white">Save</button>
                <button className="w-20 border border-black rounded-md" onClick={handleDiscardButton}>Discard</button>
            </div>


        </div>
    )
}