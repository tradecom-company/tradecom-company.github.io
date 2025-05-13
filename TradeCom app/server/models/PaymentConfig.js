//M-Pesa Integration (Daraja API)

//Admin Setup for Payment Credentials*

const mongoose = require("mongoose");

const paymentConfigSchema = new mongoose.Schema({
  paybillNumber: String,
  shortcode: String,
  mpesaConsumerKey: String,
  mpesaConsumerSecret: String,
  passkey: String,
  callbackURL: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PaymentConfig", paymentConfigSchema);


