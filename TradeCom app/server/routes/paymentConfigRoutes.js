//Endpoint for Admin to Add/Update M-Pesa Info*



const express = require("express");
const router = express.Router();
const { addOrUpdatePaymentConfig } = require("../controllers/paymentConfigController");

router.post("/admin/config", addOrUpdatePaymentConfig); // Admin route

module.exports = router;








