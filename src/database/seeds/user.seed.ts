import mongoose from "mongoose";
import User from "../../models/userModel";
import dotenv from 'dotenv';

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);

    const email = "admin@admin.com";
    const password = "123456@admin";
    const name = "admin";

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`User with email ${email} already exists`);
      return process.exit(0);
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    console.log(`User with email ${email} created successfully`);

    await mongoose.connection.close();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

run();
