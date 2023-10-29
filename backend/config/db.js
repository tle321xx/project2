import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        const connect = mongoose.connect(process.env.DB_URL)
        console.log('database connected')
    } catch (error) {
        console.log('Error in database connection')
    }
}

export default connectDB