import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { connectDB } from "@/libs/dbConnection"
import Admin from "@/models/admin"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any, req): Promise<any> {
                await connectDB()
                try {
                    if (credentials.email == '' || credentials.password == '') {
                        throw new Error('Email and Password are required')
                    }
                    const user = await Admin.findOne({
                        $or: [
                            { email: credentials.email },
                            { username: credentials.password }
                        ]
                    })
                    if (!user) {
                        throw new Error('No user found with this Email')
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                    if (isPasswordCorrect) {
                        return user
                    } else {
                        throw new Error('Incorrect Password')
                    }
                } catch (error: any) {
                    throw new Error(error)
                }
            },

        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString()
                token.username = user.username
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id
                session.user.username = token.username
            }
            return session
        },

    },
    pages: {
        signIn: '/admin'
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.JWT_SECRET,

}
