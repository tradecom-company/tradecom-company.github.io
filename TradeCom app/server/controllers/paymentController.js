
const { getAccessToken } = require('../utils/mpesaUtils');
const config = require('../config/mpesaConfig');
const moment = require('moment');
const axios = require('axios');

exports.processPayment = async (req, res) => {
  const { phoneNumber, plan } = req.body;

  if (!phoneNumber || !plan) {
    return res.status(400).json({ error: 'Phone and plan required' });
  }

  try {
    const accessToken = await getAccessToken();
    const timestamp = moment().format('YYYYMMDDHHmmss');

    const password = Buffer.from(config.shortCode + config.passkey + timestamp).toString('base64');
    const amount = plan === 'monthly' ? 5000 : plan === '6months' ? 20000 : 40000;

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: config.shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: config.shortCode,
        PhoneNumber: phoneNumber,
        CallBackURL: config.callbackURL,
        AccountReference: 'TradeCom Subscription',
        TransactionDesc: 'App Payment',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.status(200).json({ message: 'STK Push Sent. Check your phone.' });
  } catch (err) {
    console.error('Payment error:', err.response?.data || err);
    res.status(500).json({ error: 'Payment failed' });
  }
};





/*When a user completes the STK push payment on their phone, *Safaricom sends a POST request* to the `CALLBACK_URL` defined in your `.env` file. This endpoint will:
- Receive the transaction data
- Check if the payment was successful
- Activate the user’s account in the database*/

const User = require("../models/User"); // Adjust path if needed

const handleMpesaCallback = async (req, res) => {
  const callback = req.body.Body.stkCallback;

  if (!callback) return res.status(400).send("No callback body");

  const resultCode = callback.ResultCode;
  const phone = callback.CallbackMetadata?.Item?.find(i => i.Name === "PhoneNumber")?.Value;

  if (resultCode === 0) {
    // Payment successful
    try {
      const user = await User.findOne({ phone });

      if (user) {
        user.status = "active";
        user.paymentExpiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000); // 60 days
        await user.save();

        console.log(`User phone activated successfully.`);
       else 
        console.warn(`User with phone{phone} not found.`);
     }
    } catch (err) {
      console.error("Error activating user:", err.message);
    }
  } else {
    console.warn(`Payment failed or cancelled. Code: ${resultCode}`);
  }

  res.status(200).send("Callback received");
};

module.exports = { handleMpesaCallback };



 