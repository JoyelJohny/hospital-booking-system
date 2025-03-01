"use client"
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type componentProps = {
    sendDate?: React.Dispatch<React.SetStateAction<Date | null>>
    className?: string;
}


export default function DateComponent({ sendDate }: componentProps) {
    const [date, setDate] = useState<Date | null>(new Date())

    useEffect(() => {
        sendDate?.(date)
    }, [])

    const getDate = (date: Date | null) => {
        setDate(date)
        sendDate?.(date)
    }
    return (

        <DatePicker selected={date} onChange={(selectedDate) => getDate(selectedDate)} dateFormat={"yyyy-MM-dd"} minDate={new Date()} className=" rounded-md p-1 gap-2 border border-blue-700 text-xs text-center focus:outline-none" />


    )
}