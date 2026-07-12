// Run once with: npm run seed:admin
require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/User");

(async () => {
  await connectDB();

  const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (existing) {
    console.log("Admin already exists:", existing.email);
    process.exit(0);
  }

  const admin = await User.create({
    name: process.env.ADMIN_NAME || "Admin",
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  });

  console.log("Admin created successfully:", admin.email);
  process.exit(0);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
