export default function DoctorUpdateModal() {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center border border-blue-700 bg-white w-4/5 p-2 rounded-xl">
            <div className="">
                <div className="flex items-center justify-between">
                    <p className="text-xs">Doctor Name</p><input type="text" className="border-b-2 focus:outline-none" />
                </div>


            </div>
        </div>
    )
}