import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import api from '../../api';

const DonateForm = ({ userData }) => {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const handleDonate = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const donationAmount = parseFloat(amount);
        if (isNaN(donationAmount) || donationAmount <= 0) {
            setMessage('Please enter a valid donation amount.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            // Step 1: Create a payment intent and get client secret
            const { data: { clientSecret } } = await api.post('/api/payment/donate', {
                amount: donationAmount,
                userId: userData.userId,
                email:userData.email
            });

            // Step 2: Confirm payment with Stripe
            const cardElement = elements.getElement(CardElement);
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: userData.email,
                    },
                },
            });

            if (error) {
                setMessage(`Payment failed: ${error.message}`);
            } else if (paymentIntent.status === 'succeeded') {
                // Step 3: Call API to generate and send the bill
                // await api.post('/api/payment/generate-bill', {
                //     email: userData.email,
                //     amount: donationAmount,
                //     paymentId: paymentIntent.id,
                // });

                setMessage('Donation successful! A receipt has been sent to your email.');
            }
        } catch (err) {
            console.error(err);
            setMessage('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Make a Donation</h2>
            <form onSubmit={handleDonate}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Donation Amount</label>
                    <input
                        type="text"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Payment Information</label>
                    <CardElement options={{ style: { base: { fontSize: '16px', color: '#32325d' } } }} />
                </div>
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-500 transition duration-200"
                >
                    {loading ? 'Processing...' : 'Donate'}
                </button>
            </form>
            {message && <p className={`mt-4 text-center ${message.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
        </div>
    );
};

export default DonateForm;
