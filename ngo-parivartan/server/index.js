import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser'; 
import dotenv from 'dotenv';
dotenv.config()
import userRouter from './Routes/user.js'
import paymentRoute from "./Routes/payment.js"

import volunteerRoute from "./Routes/volunteer.js"
// import productRouter from './Routes/product.js'
// import cartRouter from './Routes/cart.js'
// import addressRouter from './Routes/address.js'
// import paymentRouter from './Routes/payment.js'
import cors from 'cors';

const app = express();

app.use(bodyParser.json())

app.use(cors({
  origin:true,
  methods:[ "GET","POST","PUT","DELETE"],
  credentials:true
}))

// home testing route
app.get('/',(req,res)=>res.json({messge:'This is home route'}))

// user Router
app.use('/api/user',userRouter)

app.use("/api/payment",paymentRoute)

app.use('/api/volunteers', volunteerRoute);

// // product Router
// app.use('/api/product',productRouter)

// // cart Router
// app.use('/api/cart',cartRouter)

// // address Router
// app.use('/api/address',addressRouter)

// // payment Router
// app.use('/api/payment',paymentRouter)

mongoose.connect(
process.env.mongodb,{
    dbName:"ParivartanNGO"
  }
).then(()=>console.log("MongoDB Connected Succssfully...!")).catch((err)=>console.log(err));

const port = 8000;
app.listen(port,()=>console.log(`Server is running on port ${port}`))