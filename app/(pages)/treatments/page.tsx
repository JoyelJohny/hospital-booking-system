export default function Treatment() {
    console.log("hello")
    return (<>
        <div className="px-24 py-5 space-y-4 h-full">
            <h1 className="text-[#086788] text-5xl px-6 font-semibold">Treatments</h1>
            <div className="grid grid-cols-2 gap-5 py-6">

                <button className="flex bg-[#086788] p-6 justify-center rounded-3xl text-4xl font-semibold hover:bg-green-400"> Cardiology</button>

                <button className="flex bg-[#086788] p-6 justify-center rounded-3xl text-4xl font-semibold hover:bg-green-400"> Neurology</button>

                <button className="flex bg-[#086788] p-6 justify-center rounded-3xl text-4xl font-semibold hover:bg-green-400"> Pathology</button>

                <button className="flex bg-[#086788] p-6 justify-center rounded-3xl text-4xl font-semibold hover:bg-green-400"> Colonology</button>

            </div>

        </div>
    </>)
}