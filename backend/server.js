import { app } from "./app.js";
import cloudinary from "cloudinary";
import RazorPay from "razorpay";
import dotenv from "dotenv";
import nodeCron from "node-cron";
import { connectDatabase } from "./config/database.js";
import { Stats } from "./models/Stats.js";

// connection configuration to env file
dotenv.config({ path: "./backend/config/config.env" });
// connection configuration to database
connectDatabase();

// connection cufiguration to cloudinary for images
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// crating instance of razorpay payment gateway
export const instance = new RazorPay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

nodeCron.schedule("0 0 0 0 1 *", async () => {
  try {
    await Stats.create({});
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port : ${process.env.PORT}`);
});
