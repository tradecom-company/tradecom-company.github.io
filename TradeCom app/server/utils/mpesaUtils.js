

//3. Access Token Generator


const axios = require('axios');
const config = require('../config/mpesaConfig');

exports.getAccessToken = async () => {
  const credentials = Buffer.from(`config.consumerKey:{config.consumerSecret}`).toString('base64');
  try {
    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
 });
    return response.data.access_token;
  } catch (err) {
    console.error('Access token error:', err);
    throw err;
  }
};






