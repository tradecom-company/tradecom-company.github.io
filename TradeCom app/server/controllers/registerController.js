
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const data = req.body;
    const accountType = data.accountType;
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userData = {
      accountType,
      email: data.email,
      phone: data.phone,
      password: hashedPassword
    };

    if (accountType === 'normal') {
      userData.firstName = data.firstName;
      userData.lastName = data.lastName;
      userData.status = 'active'; // Free plan
    }

    if (accountType === 'business') {
      Object.assign(userData, {
        businessName: data.businessName,
        tinNumber: data.tinNumber,
        paymentInfo: {
          mpesa: data.mpesaNumber,
          bank: data.bankAccount
        },
        businessType: data.businessType,
        category: data.businessCategory,
        description: data.description,
        shopLocation: {
          country: data.country,
          district: data.district,
          ward: data.ward,
          street: data.street,
          building: data.building
        },
        paymentPlan: data.paymentPlan,
       subscriptionExpires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 2 months
      });
    }

    if (accountType === 'delivery') {
      Object.assign(userData, {
        firstName: data.firstName,
        lastName: data.lastName,
        tinNumber: data.tinNumber,
        paymentInfo: {
          mpesa: data.mpesaNumber,
          bank: data.bankAccount
        },
        transportType: data.transportType,
        preferredRoutes: data.preferredRoutes,
        paymentPlan: data.paymentPlan,
        subscriptionExpires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 2 months
      });
    }

    const user = new User(userData);
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};







