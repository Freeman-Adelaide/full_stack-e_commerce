import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js';
import adminAuthRouter from './routes/adminAuthRoute.js';
import 'dotenv/config'


//app config
const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json()); // To parse JSON payload
app.use(express.urlencoded({ extended: true })); // To parse form-urlencoded data
app.use(cors())

//db connection
connectDB()

//api endpoints
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use('/api/admin', adminAuthRouter)
app.use('/images', express.static('uploads'))

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})  