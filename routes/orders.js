import express from "express";
import Order from "../models/Order.js";
import Lesson from "../models/Lesson.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, phone, cart } = req.body;

    if (!name || !phone || !cart) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // 1️⃣ Save the order
    const newOrder = await Order.create({ name, phone, cart });

    // 2️⃣ Update lesson spaces
    for (let item of cart) {
      await Lesson.updateOne(
        { _id: item._id },
        { $inc: { spaces: -item.quantity } }
      );
    }

    res.json({ message: "Order placed successfully!", order: newOrder });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

export default router;
