import TreatmentDetailComponent from "@/app/(components)/TreatmentDetailComponent"

export default async function SpecificTreatment({ params }: { params: Promise<{ treatmentId: string }> }) {
    const treatmentId = (await params).treatmentId
    return (<>
        <div className="px-24 py-10 space-y-4  h-screen ">
            <TreatmentDetailComponent></TreatmentDetailComponent>
            <h1 className="text-5xl px-6 text-[#086788] font-semibold">Doctors</h1>
            <div className="grid grid-cols-3 w-full gap-6 justify-between">


                <div className="rounded-xl px-6 py-4 bg-[#086788] border-2">
                    <p className="text-2xl font-bold">Dr John Doe </p>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm">Cardiology</p>
                            <p className="text-xs">johndoe@gmail.com</p>
                        </div>
                        <button className=" border-2 border-transparent box-border p-2 rounded-lg bg-green-400 text-black hover:border-black">Check availability</button>
                    </div>
                </div>


                <div className="rounded-xl px-6 py-4 bg-[#086788] border-2">
                    <p className="text-2xl font-bold">Dr John Doe </p>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm">Cardiology</p>
                            <p className="text-xs">johndoe@gmail.com</p>
                        </div>
                        <button className=" border-2 border-transparent box-border p-2 rounded-lg bg-green-400 text-black hover:border-black">Check availability</button>
                    </div>
                </div>



                <div className="rounded-xl px-6 py-4 bg-[#086788] border-2">
                    <p className="text-2xl font-bold">Dr John Doe </p>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm">Cardiology</p>
                            <p className="text-xs">johndoe@gmail.com</p>
                        </div>
                        <button className=" border-2 border-transparent box-border p-2 rounded-lg bg-green-400 text-black hover:border-black">Check availability</button>
                    </div>
                </div>


                <div className="rounded-xl px-6 py-4 bg-[#086788] border-2">
                    <p className="text-2xl font-bold">Dr John Doe </p>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm">Cardiology</p>
                            <p className="text-xs">johndoe@gmail.com</p>
                        </div>
                        <button className=" border-2 border-transparent box-border p-2 rounded-lg bg-green-400 text-black hover:border-black">Check availability</button>
                    </div>
                </div>


            </div>

        </div>
    </>)
}