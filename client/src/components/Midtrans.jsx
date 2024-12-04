import React from 'react';
import axios from 'axios';
const midtrans = ({id, amount}) => {
    const handlePayment = async () => {
        try {
            // Data transaksi
            const data = {
                id: {id},
                amout: {amount},
                customerDetails: {
                    name: 'Amsal',
                    email: 'amsaltampubolon24@gmail.com',
                    phone: '082267622725'
                }
            };

            // Request ke backend untuk mendapatkan snapToken
            const res = await axios.post('http://localhost:5000/api/order/create-payment', data);
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

export default midtrans;