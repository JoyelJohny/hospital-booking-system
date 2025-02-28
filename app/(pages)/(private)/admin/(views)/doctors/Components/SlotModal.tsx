import Form from "next/form";
type props = {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>
    selectedDay: string,
    changeSelectedDay: React.Dispatch<React.SetStateAction<string>>,
    formSubmitAction: (data: any) => void,
    selectedSlotDetail?: {
        _id: string,
        doctorId: string
        dayOfWeek: string,
        startTime: string,
        endTime: string,
        slotDuration: number,
        bufferTime: number,
    },
    slotDetailChange?: (slot: any) => void,

}
export default function SlotModal({ closeModal, formSubmitAction, selectedDay, changeSelectedDay, selectedSlotDetail, slotDetailChange }: props) {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center border border-slate-800 bg-white w-11/12  p-3 rounded-xl space-y-5 overflow-y-hidden">
            <h2 className="text-center text-lg font-semibold">Slot Details</h2>
            <Form action={(data) => formSubmitAction(data)} className="flex flex-col gap-4 h-full">
                <div className="flex text-sm items-center">
                    <label htmlFor="" className="w-40">Day of Week</label>
                    <select name="dayOfWeek" value={selectedDay} onChange={(e) => changeSelectedDay(e.currentTarget.value)} className="text-xs w-full font-semibold p-1 border border-slate-800 rounded-md">
                        <option value="Sunday" >Sunday</option>
                        <option value="Monday" >Monday</option>
                        <option value="Tuesday" >Tuesday</option>
                        <option value="Wednesday" >Wednesday</option>
                        <option value="Thursday" >Thursday</option>
                        <option value="Friday" >Friday</option>
                        <option value="Saturday" >Saturday</option>
                    </select>
                </div>
                <div className="flex text-sm items-center">
                    <label htmlFor="" className="w-40">Slot Duration</label>
                    <input name="slotDuration" type="text" value={selectedSlotDetail?.slotDuration} onChange={(e) => slotDetailChange?.(e)} className="p-1 text-xs focus:outline-none border border-slate-800 w-full rounded-md" />
                </div>
                <div className="flex text-sm items-center">
                    <label htmlFor="" className="w-40">Buffer Time</label>
                    <input name="bufferTime" type="text" value={selectedSlotDetail?.bufferTime} onChange={(e) => slotDetailChange?.(e)} className="p-1 text-xs focus:outline-none border border-slate-800 w-full rounded-md" />
                </div>
                <div className="flex text-sm items-center">
                    <label htmlFor="" className="w-40">From</label>
                    <input name="startTime" type="text" value={selectedSlotDetail?.startTime} onChange={(e) => slotDetailChange?.(e)} className="p-1 text-xs focus:outline-none border border-slate-800 w-full rounded-md" />
                </div>
                <div className="flex text-sm items-center">
                    <label htmlFor="" className="w-40">To</label>
                    <input name="endTime" type="text" value={selectedSlotDetail?.endTime} onChange={(e) => slotDetailChange?.(e)} className="p-1 text-xs focus:outline-none border border-slate-800 w-full rounded-md" />
                </div>
                <div className="flex justify-around">
                    <button className="px-4 py-1 text-xs text-white bg-slate-800 text-center rounded-md">Save</button>
                    <button className="px-4 py-1 text-xs border  border-slate-800 text-center rounded-md" onClick={() => closeModal(prev => !prev)}>Discard</button>
                </div>

            </Form>
        </div>
    )
}