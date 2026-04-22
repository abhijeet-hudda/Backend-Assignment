import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js";

app.use("/api/v3/users", userRoutes);
app.use("/api/v3/tasks", taskRoutes);

// 🔹 Health Check Route (recommended)
app.get("/api/v3/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// 🔹 Global Error Handler (IMPORTANT)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
});

export {app}