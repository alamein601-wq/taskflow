
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import auth from "./routes/auth.js";
import todos from "./routes/todos.js";
import categories from "./routes/categories.js";

const app = express();

const allowedOrigins = [
  "https://taskflow-smoky-gamma.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS: Origin not allowed"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use(express.static("public"));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskFlow AI API is running"
  });
});

app.use("/api/auth", auth);
app.use("/api/todos", todos);
app.use("/api/categories", categories);

export { app };
