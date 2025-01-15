import Form from "next/form";
export async function hello() {
    "use server"
    console.log("hello")
}
export default function CancellationRequest() {
    return (<>
        <div className="px-24 py-10 bg-gray-100">
            <Form action={hello} className="flex flex-col bg-[#086788] p-6 w-fit h-96 shadow-2xl rounded-lg justify-self-center mt-20 justify-between">
                <h1 className=" text-4xl font-semibold my-6">Request Cancellation</h1>
                <div className="flex flex-row justify-between gap-8">
                    <label className="font-semibold py-2 w-fit text-nowrap">Booking Id</label>
                    <input type="text" required className="rounded-md text-black p-1 focus:outline-slate-600 w-full" />
                </div>
                <div className=" flex justify-between gap-10 ">
                    <label className="font-semibold py-2  text-nowrap">Phone No</label>
                    <input type="text" pattern="^\+91\d{10}$" title="Phone number must start with +91 and be followed by 10 digits" placeholder="+91-xxx-xxx-xxxx" required className=" rounded-md text-black p-1 focus:outline-slate-600  w-full" />

                </div>
                <div className=" flex justify-between gap-4">
                    <label className="font-semibold py-2 text-nowrap">Date Of Birth</label>
                    <input type="date" required min={"1905-01-15"} max={"2025-01-15"} className=" rounded-md text-black py-1 px-2 focus:outline-slate-600  w-full placeholder:text-slate-100" />

                </div>

                <button type="submit" className="rounded-md  px-4 py-2 my-4 border-2 border-white text-2xl font-semibold hover:bg-green-400 hover:border-transparent">Submit</button>
            </Form>
        </div>
    </>)
}