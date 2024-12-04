const express = require('express');
const midtransClient = require('midtrans-client');

const router = require('express').Router()
const snap = new midtransClient.Snap({
    isProduction: false, // Ubah ke true jika production
    serverKey: process.env.MIDTRANS_SERVER_KEY
});

// Endpoint untuk membuat snapToken
router.post('/create-transaction', async (req, res) => {
    try {
        const { orderId, amount, customerDetails } = req.body;

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: amount
            },
            customer_details: customerDetails
        };

        const transaction = await snap.createTransaction(parameter);
        res.status(200).json({ snapToken: transaction.token });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'Error creating transaction' });
    }
});
const paymentController = require('../controllers/payment/paymentController')
const { authMiddleware } = require('../middlewares/authMiddleware')
router.get('/payment/create-stripe-connect-account', authMiddleware, paymentController.create_stripe_connect_account)

router.put('/payment/active-stripe-connect-account/:activeCode', authMiddleware, paymentController.active_stripe_connect_account)


router.get('/payment/seller-payment-details/:sellerId', authMiddleware, paymentController.get_seller_payemt_details)
router.get('/payment/request', authMiddleware, paymentController.get_payment_request)

router.post('/payment/request-confirm', authMiddleware, paymentController.payment_request_confirm)

router.post('/payment/withdrowal-request', authMiddleware, paymentController.withdrowal_request)

module.exports = router