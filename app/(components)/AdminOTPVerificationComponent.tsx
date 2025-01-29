import Form from "next/form";

export default function AdminOTPVerificationComponent() {
    return (
        <Form action={(e) => (console.log(e))} className="flex flex-col bg-white p-5 rounded-md h-2/3 justify-around my-auto drop-shadow-xl text-sm md:w-2/4 md:mx-auto lg:w-1/3 xl:w-1/4">
            <h2 className="text-center text-3xl font-semibold text-blue-800">E-mail Verification</h2>
            <p>Enter the 6-digit verification code that was sent to your e-mail.</p>
            <div className="flex items-center justify-center gap-2">
                <input type="text" maxLength={1} className="w-11 h-11 bg-blue-100 rounded  focus:outline-none focus:border-gray-500 focus:border text-center font-bold text-2xl" />
                <input type="text" maxLength={1} className="w-11 h-11 bg-blue-100 rounded  focus:outline-none focus:border-gray-500 focus:border text-center font-bold text-2xl" />
                <input type="text" maxLength={1} className="w-11 h-11 bg-blue-100 rounded  focus:outline-none focus:border-gray-500 focus:border text-center font-bold text-2xl" />
                <input type="text" maxLength={1} className="w-11 h-11 bg-blue-100 rounded  focus:outline-none focus:border-gray-500 focus:border text-center font-bold text-2xl" />
                <input type="text" maxLength={1} className="w-11 h-11 bg-blue-100 rounded  focus:outline-none focus:border-gray-500 focus:border text-center font-bold text-2xl" />
                <input type="text" maxLength={1} className="w-11 h-11 bg-blue-100 rounded  focus:outline-none focus:border-gray-500 focus:border text-center font-bold text-2xl" />
            </div>


            <button type="submit" className="border-2 py-2 px-6 bg-blue-700 rounded-md mx-auto text-white font-semibold hover:scale-105">Verify</button>
            <span className="text-gray-600 lg:hover:text-blue-600 lg:hover:underline text-center">Didn't receive code? <span className="text-blue-700 cursor-pointer">Resend</span></span>
        </Form>)
}