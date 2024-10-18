import express from "express"
import Razorpay from "razorpay"
import dotenv from "dotenv"
dotenv.config()

import { deletePayment, donate, generateBill, getAllPayments, getPaymentById, getPayments, updatePaymentStatus } from "../Controllers/payment.js"

const router = express.Router();

// const razorpayInstance = new Razorpay({
// key_id:process.env.RAZORPAY_KEY_ID,
// key_secret:RAZORPAY_SECRET
// })

router.get("/get-payment",(req,res)=>{
    res.json("Payment Details");
})

router.post('/donate', donate);

// Route for getting payment history (GET)
router.get('/payments', getPayments);

router.post('/generate-bill', generateBill);


router.get('/', getAllPayments);



// Route to get a payment by ID (optional)
router.get('/:id', getPaymentById);

// Route to update payment status (optional)
router.put('/:id', updatePaymentStatus);

// Route to delete a payment (optional)
router.delete('/:id', deletePayment);
export default router;