// models/Payment.js
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    email:{type: String, required: true},
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
    paymentIntentId: { type: String, required: true },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
