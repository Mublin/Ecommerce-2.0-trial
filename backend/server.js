import express from "express";
import mongoose from "mongoose";
import path from "path"
import dotenv from "dotenv"
import cors from "cors"
// import { data } from "./data.js";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";


const app = express()
dotenv.config()


mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("connected to db")
}).catch(err => {
    console.log(err)
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.get('/api/keys/paypal', (req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || "sb")
})
app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
})


app.use((err, req, res, next)=>{
    res.status(500).send({ message: err.message})
})



app.listen(process.env.PORT || 3000, ()=>{
    console.log(`server is working at port ${process.env.PORT}`)
})