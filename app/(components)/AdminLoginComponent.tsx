import Form from "next/form";

export default function AdminLoginComponent() {
    return (
        <Form action={(e) => (console.log(e))} className="flex flex-col bg-white p-5 rounded-md h-2/3 justify-around my-auto drop-shadow-xl text-sm md:w-2/4 md:mx-auto lg:w-1/3 xl:w-1/4">
            <h2 className="text-center text-3xl font-semibold text-blue-800">Administrator Login</h2>
            <input type="text" placeholder="E-mail" className="p-3 placeholder:text-xs border-gray-400 border-2 rounded-md focus:outline-blue-600" />
            <input type="password" placeholder="Password" className="p-3 placeholder:text-xs border-gray-400 border-2 rounded-md focus:outline-blue-600" />
            <button type="submit" className="border-2 py-2 px-6 bg-blue-700 rounded-md mx-auto text-white font-semibold hover:scale-105">Login</button>
            <span className="text-gray-600 lg:hover:text-blue-600 lg:hover:underline">Create a new account</span>
            <span className="text-gray-600">Forgot Password</span>
        </Form>)
}