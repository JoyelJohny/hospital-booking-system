import deleteIcon from '@/public/bin.png'
import Image from 'next/image'

type props = {
    discard: React.Dispatch<React.SetStateAction<boolean>>,

}

export default function TreatmentDetailModal({ discard }: props) {

    const handleDiscardButton = () => {
        discard(prev => !prev)
    }
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center border border-slate-800 bg-white w-11/12 p-3 rounded-xl space-y-5">
            <div className="flex justify-between gap-2">
                <h2 className='font-semibold'>Treatment Details</h2>
                <button className='flex items-center py-1 px-2 bg-slate-800 rounded-md'>
                    <Image src={deleteIcon} alt='' className='size-4' />
                </button>
            </div>
            <div className="flex flex-col gap-8">
                <div className="flex items-end justify-between">
                    <p className="text-xs font-semibold w-28">Treatment</p><input type="text" className="w-full border-b border-slate-800 focus:outline-none" />
                </div>
                <div className="flex items-start justify-between">
                    <p className="text-xs w-28 font-semibold">Description</p>
                    <textarea className="w-full border p-1 h-20 rounded-md border-slate-800 focus:outline-none"></textarea>
                </div>

            </div>

            <div className="flex justify-between">
                <button className="w-24 border border-transparent rounded-md bg-slate-800 text-white">Save</button>
                <button className="w-24 border border-black rounded-md" onClick={handleDiscardButton}>Discard</button>
            </div>


        </div>
    )
}