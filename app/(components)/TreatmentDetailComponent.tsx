type Treatment = {
    name: string,
    description: string
}
export default function TreatmentDetailComponent({ treatment }: { treatment: Treatment }) {
    return (<>
        <div className="p-6 border-2 space-y-4 rounded-3xl bg-[#086788]">
            <h1 className="text-5xl font-semibold">{treatment?.name}</h1>
            <p className="text-sm">{treatment?.description}</p>
        </div>
    </>)
}