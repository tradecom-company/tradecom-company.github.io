
// Step 2: Create a Scheduler File

// *File:* `server/utils/scheduler.js`


const cron = require("node-cron");
const User = require("../models/User");

// Run every day at midnight (server time)
cron.schedule("0 0 * * *", async () => {
  console.log("🔁 Running daily account status check...");

  const now = new Date();

  try {
    const expiredUsers = await User.find({
      status: "active",
      paymentExpiresAt: { lte: now );

    for (let user of expiredUsers) 
      user.status = "inactive";
      await user.save();
      console.log(`⚠️ Account deactivated for user:{user.phone}`);
    }

    console.log(`✅ Finished checking ${expiredUsers.length} expired accounts.`);
  } catch (err) {
    console.error("❌ Error during account status check:", err.message);
  }
});





