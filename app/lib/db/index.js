import mongoose from 'mongoose'
import Employee from './models/Employee'
import { hashPassword } from '@/lib/auth'
import { MONGO_UNIQUE_CONSTRAINT_ERROR } from '../constants'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local',
    )
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}


async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            autoIndex: true,
        }
        cached.promise = mongoose.connect(MONGODB_URI + "employeeDashboard", opts).then((mongoose) => {
            console.log('Db connected')
            return mongoose
        })
    }
    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}

mongoose.connection.once("connected", async (err) => {
    if (err) {
        throw err
    }
    const hrRecord = {
        first_name: "HR",
        last_name: "Support",
        designation: "HR And Admin",
        location: "Remote",
        email: process.env.HR_EMAIL || "HR@treedigit.com",
        role: "HR",
        department: "HR",
        mobile_no: "999999999999",
        experience_in_years: 10,
        personal_email: "HR@treedigit.com",
        date_of_birth: new Date(),
        emergency_contact_number: "999999999999",
        gender: "Male",
        password: await hashPassword(process.env.HR_PASSWORD || "Treedigit@123"),
        address: "Test address",
        date_of_joining: new Date(),
    };
    try {
        await Employee.create(hrRecord)
        console.log("Created HR record")
    } catch (err) {
        if (err?.code === MONGO_UNIQUE_CONSTRAINT_ERROR) {
            return
        }
        throw err
    }
})

export default dbConnect