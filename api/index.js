import dotenv from "dotenv";
import { app } from "../server/src/app.js";
import { connectDB } from "../server/src/db/index.js";

dotenv.config();

let dbPromise = null;

const handler = async (req, res) => {
  try {
    if (!dbPromise) {
      dbPromise = connectDB().catch((error) => {
        dbPromise = null;
        throw error;
      });
    }

    await dbPromise;

    return app(req, res);

  } catch (error) {
    console.error("Backend Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server or database connection failed"
    });
  }
};

export default handler;
