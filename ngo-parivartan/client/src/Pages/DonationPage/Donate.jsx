import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import DonateForm from './Donation'; // Ensure you have the correct path to your DonateForm component
import api from '../../api'; // Adjust the path as needed

const stripePromise = loadStripe('pk_test_51Pwds52MMMLUBukUyqr1L6UWXDUt7E9HrODLEjE8YdaFmnbp1rTEHA7fJwD1kxdW1SMDnPBKRK7E8hB8cjtJg0lr00YgsbFOKV');

const Donate = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Retrieve userData from localStorage and parse it
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    if (!userData) {
        return <div>Loading...</div>; // Show a loading state while userData is being fetched
    }

    return (
        <Elements stripe={stripePromise}>
            <DonateForm userData={userData} />
        </Elements>
    );
};

export default Donate;
