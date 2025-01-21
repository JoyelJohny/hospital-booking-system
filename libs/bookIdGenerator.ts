
import crypto from 'crypto'

export function createBookingId(name: string, phone: string, dob: string, t_id: string, d_id: string) {

    const hash = crypto.createHash('sha256').update(`${name}${phone}${dob}${t_id}${d_id}`).digest('hex');

    const shortHash = hash.substring(0, 8);

    console.log("BookIdgenerator")

    return `HBS${shortHash}`;
}

export function verifyUserForBookingCancellation(name: string, phone: string, dob: string, t_id: string, d_id: string, givenId: string) {

    const extractedHash = givenId.substring(3);

    const hash = crypto.createHash('sha256').update(`${name}${phone}${dob}${t_id}${d_id}`).digest('hex');
    const shortHash = hash.substring(0, 8);


    return shortHash === extractedHash;
}