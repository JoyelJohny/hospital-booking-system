import { NextResponse } from "next/server"

export async function DELETE() {
    try {
        const response = NextResponse.json({ message: "Logged Out Successfully", messageType: 'error' }, { status: 200 })
        response.cookies.set('token', '', {
            httpOnly: true,
            secure: true,
            expires: new Date(0)
        })
        return response
    } catch (error) {
        console.error(error)
    }
}