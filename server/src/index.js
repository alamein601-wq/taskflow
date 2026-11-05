import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// এনভায়রনমেন্ট ভ্যারিয়েবল লোড
dotenv.config();

// Express App ইনিশিয়ালাইজেশন
export const app = express();

// মিডলওয়্যার সেটআপ
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ডাটাবেজ কানেকশন ক্যাশ
let isConnected = false;

export const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'taskflow_ai', // আপনার ডাটাবেজের নাম
    });

    isConnected = db.connections[0].readyState === 1;
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    throw error;
  }
};

// ------------------- API ROUTES -------------------
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TaskFlow AI Backend is Healthy & Running!',
  });
});

// এখানে আপনার অন্যান্য রাউটগুলো যুক্ত হবে (যেমন Auth, Todos, Payments)
// import authRoutes from '../routes/auth.js';
// app.use('/api/auth', authRoutes);

// ------------------- SERVERLESS HANDLER -------------------
let dbPromise = null;

const handler = async (req, res) => {
  try {
    // প্রথমার ব্যাকএন্ডে হিট আসলে ডাটাবেজ কানেক্ট করবে এবং ক্যাশ করে রাখবে
    if (!dbPromise) {
      dbPromise = connectDB().catch((error) => {
        dbPromise = null; // এরর হলে রিসেট করবে যেন পরের রিকোয়েস্টে আবার চেষ্টা করে
        throw error;
      });
    }

    await dbPromise;

    // Express App দিয়ে রিকোয়েস্ট প্রসেস
    return app(req, res);
  } catch (error) {
    console.error('Backend Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server or database connection failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export default handler;
