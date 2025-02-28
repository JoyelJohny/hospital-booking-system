import Form from "next/form";

type props = {
    handleLoginModal: React.Dispatch<React.SetStateAction<boolean>>,
    handleSignUpModal: React.Dispatch<React.SetStateAction<boolean>>
    formSubmit: (email: string, password: string, username: string) => void
}
export default function AdminSignUpComponent({ handleLoginModal, handleSignUpModal, formSubmit }: props) {

    const handleLoginButton = () => {
        handleSignUpModal(prev => !prev)
        handleLoginModal(prev => !prev)
    }

    const handleSignUpFormSubmit = (e: FormData) => {

        const email = e.get('email')?.toString() || ''
        const password = e.get('password')?.toString() || ''
        const username = e.get('username')?.toString() || ''
        formSubmit(email, password, username)
    }
    return (
        <Form action={(e) => handleSignUpFormSubmit(e)} className="flex flex-col bg-white p-5 rounded-md h-2/3 justify-around my-auto drop-shadow-xl text-sm md:w-2/4 md:mx-auto lg:w-1/3 xl:w-1/4">
            <h2 className="text-center text-xl font-semibold text-blue-800 md:text-2xl">Admininstrator Sign up</h2>
            <input name="username" type="text" placeholder="Username" className="p-3 placeholder:text-xs border-gray-400 border-2 rounded-md focus:outline-blue-600" />
            <input name="email" type="text" placeholder="E-mail" className="p-3 placeholder:text-xs border-gray-400 border-2 rounded-md focus:outline-blue-600" />
            <input name="password" type="password" placeholder="Password" className="p-3 placeholder:text-xs border-gray-400 border-2 rounded-md focus:outline-blue-600" />
            <button type="submit" className="border-2 py-2 px-6 bg-blue-700 rounded-md mx-auto text-white font-semibold hover:scale-105">Sign Up</button>
            <span className="text-gray-600 ">Already Have an Account ? <button className="text-blue-700 cursor-pointer w-fit" onClick={handleLoginButton}>Login</button></span>
        </Form>)
}