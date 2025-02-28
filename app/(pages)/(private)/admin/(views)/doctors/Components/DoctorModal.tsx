import add from '@/public/add.png'
import deleteIcon from '@/public/bin.png'
import Form from 'next/form'
import Image from 'next/image'
type treatment = { _id: string, name: string }
type props = {
    discard: React.Dispatch<React.SetStateAction<boolean>>,
    availabilityModal: (id: string) => void,
    treatments: treatment[],
    doctorDetail?: {
        _id: string,
        name: string,
        specialization: string,
        treatmentId: string
        contact: string
    },
    doctorDetailChange?: (doctor: any) => void,
    formSubmitaction: (data: any) => void
}

export default function DoctorModal({ discard, availabilityModal, doctorDetail, doctorDetailChange, formSubmitaction, treatments }: props) {

    const handleDiscardButton = () => {
        discard(prev => !prev)
    }
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center border border-slate-800 bg-white w-4/5 p-3 rounded-xl space-y-10">
            <div className="flex gap-2">
                <label htmlFor="profileImage" className="hover:cursor-pointer w-full">
                    <div className="flex items-center justify-center gap-2 w-full bg-slate-800 p-1 rounded-md text-white"><Image src={add} alt='' className='size-4' />Add Profile Image</div>
                </label>
                <button className='flex items-center py-1 px-2 bg-slate-800 rounded-md'>
                    <Image src={deleteIcon} alt='' className='size-4' />
                </button>

                <input id="profileImage" type="file" className="hidden" />

            </div>
            <Form action={(data) => formSubmitaction(data)} className='space-y-10'>
                <div className="flex flex-col gap-4">
                    <div className="flex items-end justify-between">
                        <p className="text-xs font-semibold w-28">Speciality</p>
                        <select name="treatmentId" defaultValue={doctorDetail?.treatmentId} className="w-full text-sm p-1 rounded-md border border-slate-800 focus:outline-none">
                            {treatments && treatments.map((treatment) => (<option key={treatment._id} className="" value={treatment._id} >{treatment.name}</option>))}
                        </select>
                    </div>
                    <div className="flex items-end justify-between">
                        <p className="text-xs font-semibold w-28 text-nowrap">Doctor Name</p><input name='name' type="text" value={doctorDetail?.name} onChange={(e) => doctorDetailChange?.(e)} className="text-sm w-full border-b border-slate-800 focus:outline-none" />
                    </div>
                    <div className="flex items-end justify-between">
                        <p className="text-xs w-28 font-semibold">Contact</p><input name='contact' type="text" value={doctorDetail?.contact} onChange={(e) => doctorDetailChange?.(e)} className="text-sm w-full border-b border-slate-800 focus:outline-none" />
                    </div>
                </div>

                <button className='py-1 px-2 text-sm bg-slate-800 rounded-md text-white w-full' onClick={() => availabilityModal(doctorDetail?._id!)}>Set Schedule</button>
                <div className="flex justify-between">
                    <button type='submit' className="w-24 border border-transparent rounded-md bg-slate-800 text-white">Save</button>
                    <button className="w-24 border border-black rounded-md" onClick={handleDiscardButton}>Discard</button>
                </div>
            </Form>
        </div>
    )
}