
require("dotenv").config();
const axios = require("axios");

const getAccessToken = async () => {
  const auth = Buffer.from(`process.env.MPESA_CONSUMER_KEY:{process.env.MPESA_CONSUMER_SECRET}`).toString("base64");

  const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
    headers: { Authorization: `Basic ${auth}` }
  });

  return response.data.access_token;
};

const initiateSTKPush = async (phoneNumber, amount, accountReference, transactionDesc) => {
  const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  const password = Buffer.from(`{process.env.MPESA_SHORTCODE}process.env.MPESA_PASSKEY{timestamp}`).toString("base64");

  const payload = {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: process.env.MPESA_SHORTCODE,
    PhoneNumber: phoneNumber,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: accountReference,
    TransactionDesc: transactionDesc
  };

  const token = await getAccessToken();

  const response = await axios.post(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};

module.exports = { initiateSTKPush };






