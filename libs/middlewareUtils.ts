import { SignJWT, jwtVerify } from 'jose';

const secretkey = new TextEncoder().encode(process.env.JWT_SECRET)

export async function sign(data: {}) {
    try {
        const jwt = await new SignJWT(data)
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('8h')
            .sign(secretkey)

        return jwt
    } catch (error) {
        console.log(error)

    }
}

export async function verify(token: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(token, secretkey);
        return payload;
    } catch (error) {
        throw new Error('Token expired')
    }
}
