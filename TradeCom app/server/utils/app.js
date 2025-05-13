
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const registerRoutes = require("./routes/registerRoutes");
const productRoutes = require("./routes/productRoutes");
const app = express();
const PORT = process.env.PORT || 5000;   
app.use("/api", productRoutes);      
require("dotenv").config();
require("./utils/scheduler");      



const express = require('express');

const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded images

// Routes
app.use('/api/products', productRoutes);        


  const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);     

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/register", registerRoutes);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));



 





const paymentRoutes = require("./routes/paymentRoutes");
const paymentConfigRoutes = require("./routes/paymentConfigRoutes");

app.use("/api/payment", paymentRoutes);
app.use("/api", paymentConfigRoutes);





const mpesaRoutes = require('./routes/mpesaRoutes');
app.use('/api/mpesa', mpesaRoutes);


  const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/mpesa", paymentRoutes);
  






//Redirect user to correct dashboard:


router.post('/login', async (req, res) => {
const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).send('Invalid credentials');
  }

  // Save session or token logic here if applicable

  // Redirect based on account type
  if (user.accountType === 'normal') {
    res.redirect('/pages/user-dashboard.html');
  } else if (user.accountType === 'business') {
    res.redirect('/pages/business-dashboard.html');
  } else if (user.accountType === 'delivery') {
    res.redirect('/pages/delivery-dashboard.html');
  }
});

    



// a `location` field to the business accounts (under the business account creation logic):
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  accountType: {
    type: String,
    enum: ["normal", "business", "delivery"],
    required: true,
  },
  email: String,
  password: String,
  phoneNumber: String,

  // Only for business accounts:
  businessName: String,
  tinNumber: String,
  mpesaNumber: String,
  bankNumber: String,
  businessType: String,
  category: String,
  description: String,
  paymentPlan: String,
  subscriptionEnds: Date,

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: false,
    },
    address: {
      country: String,
      district: String,
      ward: String,
      street: String,
      building: String,
    }
  },

  // Common to all users
  firstName: String,
  lastName: String,
  profileImage: String,
  isActive: { type: Boolean, default: false }
}, {
 timestamps: true,
});

userSchema.index({ location: "2dsphere" }); // 🔍 Enables geolocation queries

module.exports = mongoose.model("User", userSchema);



 const shopRoutes = require('./routes/shopRoutes');
app.use('/api/shops', shopRoutes);      