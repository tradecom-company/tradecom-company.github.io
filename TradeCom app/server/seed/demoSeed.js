

// seed/demoSeed.js
const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const User = require('../server/models/User');

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const data = JSON.parse(fs.readFileSync('./seed/demoUsers.json', 'utf-8'));

    for (let user of data) {
      // Optional: hash password here using bcrypt
      const newUser = new User(user);
      await newUser.save();
    }

    console.log('✅ Demo users added to the database');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();


