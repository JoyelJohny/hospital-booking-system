import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) throw new Error('MONGO_URI is not defined.');

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null };


export const connectDB = async () => {

    if (cached.conn) return cached.conn;
    console.log(MONGODB_URI)

    cached.conn = await mongoose.connect(MONGODB_URI, { dbName: "hospital-booking-system" });

    return cached.conn;
};