import Image from "next/image"
import create from "@/public/write.png"
import edit from "@/public/edit-text.png"
import bin from "@/public/bin.png"
import Form from "next/form"
import DividerComponent from "@/app/(components)/DividerComponent"

export async function hello() {
    "use server"
    console.log("hello")
}

export default function Doctor() {
    return (<>
        <div className="px-40 py-10 border-2">
            <div className="grid grid-cols-3 gap-10 w-full h-full place-content-center ">

                <div className="flex flex-col bg-[#086788] p-5 justify-center rounded-3xl ">
                    <div className="flex justify-between">
                        <h2 className="text-2xl py-1 font-semibold">Dr John Doe</h2>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 hover:bg-green-400 p-2 rounded-xl"><Image src={edit} width={24} height={24} alt="edit button image" /></button>
                            <button className="w-10 h-10 hover:bg-red-400 p-2 rounded-xl"><Image src={bin} width={24} height={24} alt="delete button image" /></button>
                        </div>
                    </div>
                    <div className="flex justify-between py-1">
                        <div>
                            <p className="text-sm">Cardiology</p>
                            <p className="text-xs">johndoe@gmail.com</p>
                        </div>

                        <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent">Set availability</button>
                    </div>


                </div>

            </div>

            {/* Doctor updation Form*/}

            {/* <Form action={hello} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center bg-black p-6 rounded-lg space-y-5">
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Dr Name</label>
                    <input type="text" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Treatment</label>
                    <input type="text" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Contact</label>
                    <input type="text" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-around gap-2">
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent">Update</button>
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-red-400 hover:border-transparent">Cancel</button>
                </div>
            </Form> */}

            {/* Doctor creation Form*/}

            {/* <Form action={hello} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center bg-black p-6 rounded-lg space-y-5">
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Dr Name</label>
                    <input type="text" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Treatment</label>
                    <input type="text" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Treatment ID</label>
                    <input type="text" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-between gap-2">
                    <label htmlFor="" className="py-2 font-semibold text-sm">Contact</label>
                    <input type="text" className="text-black p-2 rounded-md focus:outline-slate-500" />
                </div>
                <div className="flex justify-around gap-2">
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent">Create</button>
                    <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-red-400 hover:border-transparent">Cancel</button>
                </div>
            </Form> */}

            <Form action={hello} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-300 p-6">
                <div className="rounded-xl px-6 py-4 bg-[#086788] border-2">
                    <p className="text-2xl font-bold">Dr John Doe </p>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm">Cardiology</p>
                            <p className="text-xs">johndoe@gmail.com</p>
                        </div>

                    </div>
                </div>
                <h1>Availability</h1>
                <DividerComponent />
                <h1>Add new</h1>
                <button className="rounded-md  px-2 py-1 my-4 border-2 border-white text-xs font-semibold hover:bg-green-400 hover:border-transparent">Sunday</button>
                <button className="rounded-md  px-2 py-1 my-4 border-2 border-white text-xs font-semibold hover:bg-green-400 hover:border-transparent">Monday</button>
                <button className="rounded-md  px-2 py-1 my-4 border-2 border-white text-xs font-semibold hover:bg-green-400 hover:border-transparent">Tuesday</button>
                <button className="rounded-md  px-2 py-1 my-4 border-2 border-white text-xs font-semibold hover:bg-green-400 hover:border-transparent">Wednesday</button>
                <button className="rounded-md  px-2 py-1 my-4 border-2 border-white text-xs font-semibold hover:bg-green-400 hover:border-transparent">Thursday</button>
                <button className="rounded-md  px-2 py-1 my-4 border-2 border-white text-xs font-semibold hover:bg-green-400 hover:border-transparent">Friday</button>
                <button className="rounded-md  px-2 py-1 my-4 border-2 border-white text-xs font-semibold hover:bg-green-400 hover:border-transparent">Saturday</button>
                <label htmlFor="">Start time</label><input type="text" />
                <label htmlFor="">End time</label><input type="text" />
                <label htmlFor="">Slot Duration</label><input type="text" />
                <label htmlFor="">Buffer Time</label><input type="text" />
                <button type="submit" className="rounded-md  px-4 py-2 my-4 border-2 border-white text-2xl font-semibold hover:bg-green-400 hover:border-transparent">Add</button>
                <DividerComponent />

            </Form>

            <button className="bg-white w-20 h-20 fixed bottom-20 right-20 rounded-full p-5 shadow-md shadow-black">
                <Image src={create} width={64} height={64} className="text-white" alt="create button image" />
            </button>
        </div>
    </>)
}