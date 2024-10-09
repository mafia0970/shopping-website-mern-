import mongoose from "mongoose"

export const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`connected to ${conn.connection.host}`)
    } catch (error) {
        console.log(`error ${error.message}`);
        process.exit(1);
    }
}