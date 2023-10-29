import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import connectDB from './config/db.js'
import authRoute from './routes/authRoute.js'

const app = express()
dotenv.config()


connectDB()
app.use(cors())
app.use(express.json())

app.use('/api/v1/auth', authRoute)

app.get('/', (req,res)=>{
    res.send('hello')
})


const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})