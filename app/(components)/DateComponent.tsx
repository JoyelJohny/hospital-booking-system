"use client"
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type componentProps = {
    sendDate: (d: Date | null) => void;
}


export default function DateComponent({ sendDate }: componentProps) {
    const [date, setDate] = useState<Date | null>(new Date())
    const getDate = (date: Date | null) => {
        setDate(date)
        sendDate(date)
    }
    return (<>
        <div className="text-slate-600">
            <DatePicker selected={date} onChange={(selectedDate) => getDate(selectedDate)} dateFormat={"dd/MM/yyyy"} minDate={new Date()} className="rounded-lg p-2 gap-2 border-2 border-slate-600" />
        </div>

    </>)
}