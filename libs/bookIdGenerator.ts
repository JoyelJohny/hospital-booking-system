import crypto from 'crypto'

export function createBookingId(name: string, phone: string, dob: string) {

    const hash = crypto.createHash('sha256').update(`${name}${phone}${dob}`).digest('hex');

    // Truncate the hash to make it short (e.g., 8 characters)
    const shortHash = hash.substring(0, 8);

    // Add the prefix 'hbs' to the short hash
    return `HBS${shortHash}`;
}

export function verifyUserForBookingCancellation(name: string, phone: string, dob: string, givenId: string) {
    const extractedHash = givenId.substring(3); // Remove 'hbs'

    // Generate a new hash from the user input
    const hash = crypto.createHash('sha256').update(`${name}${phone}${dob}`).digest('hex');
    const shortHash = hash.substring(0, 8); // Truncate to match the original length

    // Compare the generated short hash with the extracted hash from the given ID
    return shortHash === extractedHash;
}