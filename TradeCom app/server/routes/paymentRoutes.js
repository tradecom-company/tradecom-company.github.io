const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/', paymentController.processPayment);

module.exports = router;







const express = require("express");
const axios = require("axios");

const moment = require("moment");
require("dotenv").config();

// Import env variables
const {
  MPESA_SHORTCODE,
  MPESA_PASSKEY,
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  CALLBACK_URL
} = process.env;

// Get M-Pesa access token
const getToken = async () => {
  const auth = Buffer.from(`MPESA_CONSUMER_KEY:{MPESA_CONSUMER_SECRET}`).toString("base64");
  const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
    headers: {
      Authorization: `Basic ${auth}`
    }
  });
  return response.data.access_token;
};

// STK push route
router.post("/pay", async (req, res) => {
  const { phone, plan, accountType } = req.body;

  if (!phone || !plan || !accountType) {
       return res.status(400).json( message: "Missing payment information." );
  

  const sanitizedPhone = phone.replace(/^0/, "254"); // Convert 07xx to 2547xx
  const amount = determineAmount(plan, accountType);
  const timestamp = moment().format("YYYYMMDDHHmmss");
  const password = Buffer.from(`{MPESA_SHORTCODE}MPESA_PASSKEY{timestamp}`).toString("base64");

  try {
    const token = await getToken();

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: sanitizedPhone,
        PartyB: MPESA_SHORTCODE,
        PhoneNumber: sanitizedPhone,
        CallBackURL: CALLBACK_URL,
        AccountReference: accountType,
        TransactionDesc: `Payment for accountType`
      ,
      
        headers: 
          Authorization: `Bearer{token}`
        }
      }
    );

    res.status(200).json({
      message: "STK push sent. Complete the payment on your phone.",
      response: response.data
    });
  } catch (error) {
    console.error("Payment error:", error.response?.data || error.message);
    res.status(500).json({
     message: "Failed to initiate payment.",
      error: error.response?.data || error.message
    });
  }
});

// Helper function
function determineAmount(plan, accountType) {
  if (accountType === "business") {
    if (plan === "monthly") return 5000;
    if (plan === "6months") return 20000;
    if (plan === "annually") return 40000;
  } else if (accountType === "delivery") {
    if (plan === "monthly") return 3000;
    if (plan === "6months") return 15000;
    if (plan === "annually") return 35000;
  }
  return 0; // Free for normal accounts
}

module.exports = router;





const { handleMpesaCallback } = require("../controllers/paymentController");

// Callback route
router.post("/callback", handleMpesaCallback);








