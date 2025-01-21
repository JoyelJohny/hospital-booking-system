import Admin from '@/models/admin';

import bcrypt from "bcrypt"
import { connectDB } from './dbConnection';

const adminName = process.env.ADMIN_USER || 'admin'
const pass = process.env.ADMIN_PASS || 'admin123'

export default async function initializeAdminCollection() {
    try {
        connectDB()
        const adminCount = await Admin.countDocuments()

        const hashedPassword = await bcrypt.hash(pass, 3)


        if (adminCount === 0) {

            const defaultAdmin = {
                username: adminName,
                password: hashedPassword,
            };

            await Admin.create(defaultAdmin);
            console.log('Default admin user created.');
        } else {
            console.log('Admin collection already exists.');
        }
    } catch (error) {
        console.error('Error initializing admin collection:', error);
    }
}

