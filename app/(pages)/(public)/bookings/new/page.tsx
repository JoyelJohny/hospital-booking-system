import DividerComponent from "@/app/(components)/DividerComponent";
import Form from "next/form";
export async function hello() {
    "use server"
    console.log("hello")
}
export default function AppointmentBooking() {
    return (<>
        <div className="px-24 py-6 bg-gray-100">
            <Form action={hello} className="flex flex-col bg-[#086788] px-6 py-4 w-fit h-fit shadow-2xl rounded-lg justify-self-center justify-between">
                <h1 className=" text-4xl font-semibold mb-6 text-center">Book an Appointment</h1>
                <h2 className="font-semibold text-lg">Appointment Details</h2>
                <DividerComponent />
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm">Consultation By</div><div className="text-sm">: Dr John Doe</div></div>
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm">Treatment</div><div className="text-sm">: Cardiology</div></div>
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm">Date</div><div className="text-sm">: 22-12-2024</div></div>
                    <div className=" flex gap-4 "><div className=" font-semibold text-sm">Timings</div><div className="text-sm">: 10:00 am - 12:00 pm</div></div>
                </div>
                <h2 className="mt-8 font-semibold text-lg">Patient Details</h2>
                <DividerComponent />

                <div className="grid grid-cols-2 gap-x-4 gap-y-4 my-2">
                    <div className="flex gap-4 justify-between"><label className="py-2 font-semibold text-sm">Name</label> <input type="text" required className="text-black p-2 rounded-md focus:outline-slate-500" /></div>
                    <div className="flex gap-2 justify-between">
                        <label className="py-2 font-semibold text-sm">Gender</label>
                        <select id="gender-select" required className="text-black p-2 rounded-md focus:outline-slate-500 w-full">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Others</option>
                        </select>
                    </div>
                    <div className="flex gap-4 justify-between"><label className="py-2 font-semibold text-sm">Age</label> <input type="text" required className="text-black p-2 rounded-md focus:outline-slate-500" /></div>
                    <div className="flex gap-4 justify-between"><label className="py-2 font-semibold text-sm">D.O.B</label> <input type="date" required className="text-black p-2 rounded-md focus:outline-slate-500 w-full" /></div>
                    <div className="flex gap-4 justify-between"><label className="py-2 font-semibold text-sm">Phone</label> <input type="text" required className="text-black p-2 rounded-md focus:outline-slate-500" /></div>
                    <div className="flex gap-4 justify-between"><label className="py-2 font-semibold text-sm">Email</label> <input type="email" required className="text-black p-2 rounded-md focus:outline-slate-500" /></div>
                </div>
                <div className="flex flex-col my-2 gap-4">
                    <label className="font-semibold text-sm">Additonal Description (Optional)</label>
                    <textarea name="" id="" className="text-black rounded-md p-2"></textarea>
                </div>
                <button type="submit" className="rounded-md  px-4 py-2 my-4 border-2 border-white text-2xl font-semibold hover:bg-green-400 hover:border-transparent">Submit</button>


            </Form>
        </div>
    </>)
}