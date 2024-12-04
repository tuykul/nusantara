import React from 'react';
import axios from 'axios';
const PaymentButton = () => {
    const handlePayment = async () => {
        try {
            // Data transaksi
            const data = {
                orderId: 'ORDER-12345',
                amount: 200000,
                customerDetails: {
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'john.doe@example.com',
                    phone: '08123456789'
                }
            };

            // Request ke backend untuk mendapatkan snapToken
            const res = await axios.post('http://localhost:5000/api/payment/create-transaction', data);
            const { snapToken } = res.data;

            // Panggil Midtrans pop-up
            window.snap.pay(snapToken, {
                onSuccess: (result) => alert('Payment Successful!'),
                onPending: (result) => alert('Payment Pending!'),
                onError: (result) => alert('Payment Failed!'),
                onClose: () => alert('Payment window closed!')
            });
        } catch (error) {
            console.error('Payment error:', error);
        }
    };

    return <button onClick={handlePayment}>Pay Now</button>;
};

export default PaymentButton;