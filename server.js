import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// -------- MIDDLEWARE --------

// CORS
app.use(cors());
app.use(express.json());

// Logger middleware (REQUIRED for coursework)
app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
});

// Static file middleware (REQUIRED for coursework)
app.use("/images", express.static("images"));


// -------- DATABASE --------

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));


// -------- ROUTES --------

import lessonsRoute from "./routes/lessons.js";
import ordersRoute from "./routes/orders.js";

app.use("/lessons", lessonsRoute);
app.use("/orders", ordersRoute);

// Test route
app.get("/", (req, res) => {
  res.send("Backend server is running 🚀");
});


// -------- START SERVER --------

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
