import { connectDB } from "./db/index.js";
import { app } from "./app.js";

let dbPromise;

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
      message: "Database connection failed"
    });
  }
};

export default handler;
