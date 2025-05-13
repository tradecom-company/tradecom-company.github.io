
const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  address: String,
  contact: String,
  paymentInfo: {
    mpesaTill: String,
    bankAccount: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  }
});

ShopSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Shop', ShopSchema);




    

