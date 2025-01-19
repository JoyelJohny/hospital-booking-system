import crypto from 'crypto'

export function createBookingId(name: string, phone: string, dob: string, t_id: string, d_id: string) {

    const hash = crypto.createHash('sha256').update(`${name}${phone}${dob}${t_id}${d_id}`).digest('hex');

    // Truncate the hash to make it short (e.g., 8 characters)
    const shortHash = hash.substring(0, 8);

    // Add the prefix 'hbs' to the short hash
    return `HBS${shortHash}`;
}

export function verifyUserForBookingCancellation(name: string, phone: string, dob: string, t_id: string, d_id: string, givenId: string) {
    const extractedHash = givenId.substring(3); // Remove 'hbs'

    // Generate a new hash from the user input
    const hash = crypto.createHash('sha256').update(`${name}${phone}${dob}${t_id}${d_id}`).digest('hex');
    const shortHash = hash.substring(0, 8); // Truncate to match the original length

    // Compare the generated short hash with the extracted hash from the given ID
    return shortHash === extractedHash;
}

export function dateFormatter(givendate: string) {
    const date = new Date(givendate)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`
}