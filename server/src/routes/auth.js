
import express from "express";
import {
  register,
  login,
  getProfile,
  logout
} from "../controllers/authControllers.js";
import { protect } from "../middleware/auth.js";
import User from "../models/user.models.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/profile", protect, getProfile);
router.post("/logout", protect, logout);

// bKash manual payment submission
router.post("/bkash-submit", protect, async (req, res) => {
  try {
    const { senderNumber, trxId } = req.body;

    // Validate input
    if (
      typeof senderNumber !== "string" ||
      typeof trxId !== "string" ||
      !senderNumber.trim() ||
      !trxId.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "প্রেরক নম্বর এবং ট্রানজেকশন আইডি আবশ্যক।"
      });
    }

    const cleanSenderNumber = senderNumber.trim();
    const cleanTrxId = trxId.trim();

    // Find authenticated user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "ইউজার পাওয়া যায়নি।"
      });
    }

    // Save payment request
    user.bkashSenderNumber = cleanSenderNumber;
    user.bkashTrxId = cleanTrxId;
    user.paymentStatus = "Pending";

    // Do not activate premium before payment verification
    user.isPremium = false;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "বিকাশ পেমেন্ট রিকোয়েস্ট সফলভাবে জমা হয়েছে। যাচাই শেষে অ্যাকাউন্ট আপডেট করা হবে।",
      data: {
        paymentStatus: user.paymentStatus,
        isPremium: user.isPremium
      }
    });

  } catch (error) {
    console.error("bKash submission error:", error.message);

    return res.status(500).json({
      success: false,
      message: "পেমেন্ট রিকোয়েস্ট জমা দেওয়া যায়নি। আবার চেষ্টা করুন।"
    });
  }
});

export default router;
