import Admin from '@/models/admin';

import bcrypt from "bcrypt"
import { connectDB } from './dbConnection';

export default async function initializeAdminCollection() {
    try {
        connectDB()
        const adminCount = await Admin.countDocuments()

        const hashedPassword = await bcrypt.hash('admin123', 3)


        if (adminCount === 0) {

            const defaultAdmin = {
                username: 'admin',
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

