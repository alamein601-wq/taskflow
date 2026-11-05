import express from 'express';
import { register, login, getProfile, logout } from "../controllers/authControllers.js";
import { protect } from '../middleware/auth.js';
import User from '../models/user.models.js'; // ইউজার মডেল ইমপোর্ট

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', protect, getProfile);
router.post('/logout', protect, logout);

// 👇 বিকাশ ম্যানুয়াল পেমেন্ট সাবমিট রাউট (01723209404)
router.post('/bkash-submit', protect, async (req, res) => {
  try {
    const { senderNumber, trxId } = req.body;

    if (!senderNumber || !trxId) {
      return res.status(400).json({ success: false, message: 'প্রেরক নম্বর এবং ট্রানজেকশন আইডি আবশ্যক।' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'ইউজার পাওয়া যায়নি।' });
    }

    // ইউজারের ডাটাবেজে বিকাশ তথ্য সেভ করা
    user.bkashSenderNumber = senderNumber;
    user.bkashTrxId = trxId;
    user.paymentStatus = 'Pending';
    await user.save();

    res.status(200).json({
      success: true,
      message: 'বিকাশ পেমেন্ট রিকোয়েস্ট সফলভাবে জমা হয়েছে। যাচাই করে অ্যাকাউন্ট একটিভ করা হবে।'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
