
//✅ 2. Create Callback Controller

// `server/controllers/mpesaController.js`
const User = require('../models/User'); // Adjust path if needed

exports.handleCallback = async (req, res) => {
  try {
    const body = req.body;

    console.log('M-Pesa Callback received:', JSON.stringify(body, null, 2));

    const stkCallback = body.Body?.stkCallback;

    if (!stkCallback || stkCallback.ResultCode !== 0) {
      return res.status(200).json({ message: 'Transaction failed or canceled' });
    }
const phoneNumber = stkCallback.CallbackMetadata?.Item.find(i => i.Name === 'PhoneNumber')?.Value;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number missing from callback' });
    }

    // Update the user account
    await User.findOneAndUpdate(
      { phoneNumber },
      {
        isActive: true,
        paymentStatus: 'paid',
        lastPaymentDate: new Date(),
        // Optionally: reset countdown/free-trial status
      }
    );

    res.status(200).json({ message: 'Payment processed successfully' });
  } catch (error) {
    console.error('Callback handling error:', error);
    res.status(500).json({ error: 'Callback processing failed' });
  }
};


 
