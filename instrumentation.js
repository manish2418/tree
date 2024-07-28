import connectDB from './app/lib/db'

export async function register() {
    await connectDB()
}