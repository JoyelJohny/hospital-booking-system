import TreatmentDetailComponent from "@/app/(components)/TreatmentDetailComponent"

export default async function SpecificTreatment({ params }: { params: Promise<{ treatmentId: string }> }) {
    const treatmentId = (await params).treatmentId
    return (<>
        <div className="px-24 py-5 space-y-4  h-full ">
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
                        <button className=" border-2 border-transparent box-border p-2 rounded-lg font-semibold  border-white hover:bg-green-400 hover:border-transparent">Check availability</button>
                    </div>
                </div>

            </div>
            <div className="absolute top-28 left-1/4 w-2/4 h-3/4 p-6 bg-black rounded-xl">Hello</div>

        </div>
    </>)
}