'use client'
import { useEffect, useRef, useState } from "react"
type childProps = {
    messageType: string,
    message: string
    trigger: number
}
export default function Message({ messageType, message, trigger }: childProps) {
    const backgroundColor = messageType == 'success' ? 'bg-green-400' : 'bg-red-400'
    const [visible, setVisible] = useState(`hidden`)
    const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        setTimeouts()
        return () => {
            clearTimeouts()
        };
    }, [trigger]);

    const handleMouseEnter = () => {
        clearTimeouts()
    };

    const handleMouseLeave = () => {
        timeoutRefs.current[4] = setTimeout(() => {
            setVisible(`${backgroundColor} opacity-0`);
        }, 2000);

        timeoutRefs.current[5] = setTimeout(() => {
            setVisible(`hidden`);
        }, 2500);
    };

    const setTimeouts = () => {

        timeoutRefs.current[0] = setTimeout(() => {
            setVisible(`${backgroundColor} opacity-0`);
        }, 0);


        timeoutRefs.current[1] = setTimeout(() => {
            setVisible(`${backgroundColor} -translate-x-32`);
        }, 1000);

        timeoutRefs.current[2] = setTimeout(() => {
            setVisible(`${backgroundColor} opacity-0`);
        }, 3500);

        timeoutRefs.current[3] = setTimeout(() => {
            setVisible(`hidden`);
        }, 4000);


    }

    const clearTimeouts = () => {
        timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    }

    return (
        <>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`absolute flex items-center justify-center text-nowrap transition-all ease-in-out duration-500 rounded-md transform font-semibold px-4 top-24 right-0 text-white h-10 ${visible}`}>
                {message}
            </div>
        </>
    )

}