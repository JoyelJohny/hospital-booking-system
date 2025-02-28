import Form from "next/form";

type props = {
    handleSignUpModal: React.Dispatch<React.SetStateAction<boolean>>,
    handleLoginModal: React.Dispatch<React.SetStateAction<boolean>>,
    handleForgotPasswordModal: React.Dispatch<React.SetStateAction<boolean>>,
    formSubmit: (email: string, password: string) => void
}

export default function AdminLoginComponent({ handleSignUpModal, handleLoginModal, handleForgotPasswordModal, formSubmit }: props) {
    const handleSignUpButton = () => {
        handleSignUpModal(prev => !prev)
        handleLoginModal(prev => !prev)
    }

    const handleForgotPasswordButton = () => {
        handleForgotPasswordModal(prev => !prev)
        handleLoginModal(prev => !prev)
    }

    const handleLoginFormSubmit = (e: FormData) => {
        const email = e.get('email')?.toString() || ''
        const password = e.get('password')?.toString() || ''
        formSubmit(email, password)
    }
    return (
        <Form action={(e) => handleLoginFormSubmit(e)} className="flex flex-col bg-white p-5 rounded-md h-2/3 justify-around my-auto drop-shadow-xl text-sm md:w-2/4 md:mx-auto lg:w-1/3 xl:w-1/4">
            <h2 className="text-center text-xl font-semibold text-blue-800 md:text-2xl xl:text-3xl">Administrator Login</h2>
            <input name="email" type="email" placeholder="E-mail" className="p-3 placeholder:text-xs border-gray-400 border-2 rounded-md focus:outline-blue-600" />
            <input name="password" type="password" placeholder="Password" className="p-3 placeholder:text-xs border-gray-400 border-2 rounded-md focus:outline-blue-600" />
            <button type="submit" className="border-2 py-2 px-6 bg-blue-700 rounded-md mx-auto text-white font-semibold hover:scale-105">Login</button>
            <button className="text-gray-600 lg:hover:text-blue-600 lg:hover:underline w-fit" onClick={handleSignUpButton}>Create a new account</button>
            <button className="text-gray-600 w-fit" onClick={handleForgotPasswordButton}>Forgot Password</button>
        </Form>)
}