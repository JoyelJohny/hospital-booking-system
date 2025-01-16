type componentProps = {
    falseOption: (b: boolean) => void,
    trueOption: () => void
}


export default function ConfirmationComponent({ falseOption, trueOption }: componentProps) {
    const handleClick = (b: boolean) => {
        if (b) trueOption()
        else falseOption(b)
    }
    return (<>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#086788] border-4 rounded-xl px-4 py-2 ">
                <span className="text-nowrap">Are you sure you want to continue ?</span>
                <div className="flex gap-4">
                    <button className="rounded-md w-full px-4 py-1 my-4 border-2 border-white text-2xl font-semibold hover:bg-green-400 hover:border-transparent" onClick={() => handleClick(true)}>Yes</button>
                    <button className="rounded-md w-full px-4 py-1 my-4 border-2 border-white text-2xl font-semibold hover:bg-red-400 hover:border-transparent" onClick={() => handleClick(false)}>No</button>
                </div>
            </div>
        </div>
    </>)
}