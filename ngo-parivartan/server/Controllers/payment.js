import Stripe from "stripe";
import Payment from "../Models/Payment.js"; 
import dotenv from "dotenv";

dotenv.config();

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Function to handle donations
export const donate = async (req, res) => {
    const { amount, userId,email } = req.body;

    try {
        // Create a PaymentIntent using Stripe API
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert amount to smallest currency unit (paise)
            currency: 'inr',      // Change to INR for Indian Rupees
            metadata: { userId },  // Attach the userId to the payment intent
        });

        // Save the payment details in MongoDB
        const payment = new Payment({
            userId,
            email,
            amount,
            currency: 'inr',
            status: paymentIntent.status,
            paymentIntentId: paymentIntent.id,
        });

        await payment.save();
      console.log(paymentIntent.client_secret)
        // Respond with the client secret so the frontend can confirm the payment
        res.status(200).send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment: ', error);
        res.status(500).send({ error: error.message || 'Payment failed' });
    }
};

// Function to get all payments (for example, if you want to see payment history)
export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error fetching payments: ', error);
        res.status(500).json({ error: 'Error fetching payment history' });
    }
};


import nodemailer from 'nodemailer';

export const generateBill = async (req, res) => {
    const { email, amount, paymentId } = req.body;
console.log(email)
    try {
        // Logic for generating a receipt
        const receipt = `
            Thank you for your donation of $${amount}. 
            Payment ID: ${paymentId}. 
            We appreciate your support!
        `;

        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: 'dmmovie670@gmail.com',
                pass: 'Yash##786'
            }
        });

        // Email options
        const mailOptions = {
            from: 'dmmovie670@gmail.com', // Your email
            to: email,
            subject: 'Donation Receipt',
            text: receipt,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: 'Bill sent successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to generate bill.' });
    }
};


export const getAllPayments = async (req, res) => {
    try {
      const payments = await Payment.find();
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getPaymentById = async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id);
      if (payment == null) {
        return res.status(404).json({ message: 'Payment not found' });
      }
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update payment status (optional)
  export const updatePaymentStatus = async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id);
      if (payment == null) {
        return res.status(404).json({ message: 'Payment not found' });
      }
  
      if (req.body.status != null) {
        payment.status = req.body.status;
      }
  
      const updatedPayment = await payment.save();
      res.status(200).json(updatedPayment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a payment (optional)
  export const deletePayment = async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id);
      if (payment == null) {
        return res.status(404).json({ message: 'Payment not found' });
      }
  
      await payment.remove();
      res.status(200).json({ message: 'Payment deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
