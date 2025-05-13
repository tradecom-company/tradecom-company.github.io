

//✅ 1. Create Callback Route

//`server/routes/mpesaRoutes.js`

const express = require('express');
const router = express.Router();
const mpesaController = require('../controllers/mpesaController');

router.post('/callback', mpesaController.handleCallback);

module.exports = router;



