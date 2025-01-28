import Form from "next/form";

export default function AdminForgotPasswordComponent() {
    return (
        <Form action={(e) => (console.log(e))} className="flex flex-col bg-white p-5 rounded-md h-2/3 justify-between my-auto drop-shadow-xl text-sm md:w-2/4 md:mx-auto lg:w-1/3 xl:w-1/4">
            <h1 className="font-bold text-center text-3xl">E-mail Verification</h1>
            <div className="space-y-5">
                <span className="text-xs">Enter the email to send the OTP for verification</span>
                <input type="text" placeholder="E-mail" className="p-3 placeholder:text-xs border-gray-400 border-2 rounded-md focus:outline-blue-600 w-full" />
            </div>


            <button type="submit" className="border-2 py-2 px-6 bg-blue-700 rounded-md mx-auto text-white font-semibold hover:scale-105">Send OTP</button>

        </Form>
    )
}