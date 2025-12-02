// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

import createLessonsRouter from "./routes/lessons.js";
import createOrdersRouter from "./routes/orders.js";

dotenv.config();

const app = express();

// ---------- MIDDLEWARE ----------

// CORS
app.use(cors());
app.use(express.json());

// Logger
app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url} from ${req.ip}`);
  next();
});

// Static files (images)
app.use("/images", express.static("images"));

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

// ---------- MONGODB CONNECTION + START ----------

async function startServer() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("AfterSchoolDB");

    // Attach routers with db
    app.use("/lessons", createLessonsRouter(db));
    app.use("/orders", createOrdersRouter(db));

    // Test root route
    app.get("/", (req, res) => {
      res.send("Backend server is running");
    });

    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
