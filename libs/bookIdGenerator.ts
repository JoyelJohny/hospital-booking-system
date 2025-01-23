
import crypto from 'crypto'

export function createBookingId(name: string, date: string, t_id: string, d_id: string) {

    const hash = crypto.createHash('sha256').update(`${name}${date}${t_id}${d_id}`).digest('hex');

    const shortHash = hash.substring(0, 8);

    console.log("BookIdgenerator")

    return `HBS${shortHash}`;
}
