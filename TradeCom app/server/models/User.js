
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  accountType: { type: String, enum: ['normal', 'business', 'delivery'], required: true },
  
  // Shared fields
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  
  // Business fields
  businessName: String,
  tinNumber: String,
  paymentInfo: {
    mpesa: String,
    bank: String
  },
  businessType: String,
  category: String,
  description: String,
  shopLocation: {
    country: String,
    district: String,
    ward: String,
    street: String,
    building: String
  },
  shopImage: String,
  paymentPlan: String,
  subscriptionExpires: Date,
  
  // Delivery-specific fields
  transportType: String,
  preferredRoutes: String,
  
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'inactive' }
});

module.exports = mongoose.model('User', userSchema);






