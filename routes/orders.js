// routes/orders.js
import express from "express";
import { ObjectId } from "mongodb";

export default function createOrdersRouter(db) {
  const router = express.Router();
  const ordersCollection = db.collection("orders");
  const lessonsCollection = db.collection("lessons");

  // POST /orders – create order + update lesson spaces
  router.post("/", async (req, res) => {
    try {
      const { name, phone, cart } = req.body;

      if (!name || !phone || !Array.isArray(cart) || cart.length === 0) {
        return res.status(400).json({ error: "Missing or invalid fields" });
      }

      if (!/^[A-Za-z\s]+$/.test(name)) {
        return res.status(400).json({
          error: "Name must contain letters only."
        });
      }

      if (!/^\d+$/.test(phone)) {
        return res.status(400).json({
          error: "Phone number must contain only digits."
        });
      }

      if (phone.length < 7 || phone.length > 15) {
        return res.status(400).json({
          error: "Phone number length is invalid."
        });
      }

      const orderDoc = {
        name,
        phone,
        cart,        
        createdAt: new Date(),
      };

      // 1) Save order
      const result = await ordersCollection.insertOne(orderDoc);
      orderDoc._id = result.insertedId;

      // 2) Update spaces for each lesson
      for (const item of cart) {
        if (!item._id || !item.quantity) continue;

        await lessonsCollection.updateOne(
          { _id: new ObjectId(item._id) },
          { $inc: { spaces: -item.quantity } }
        );
      }

      res.status(201).json({
        message: "Order placed successfully!",
        order: orderDoc,
      });
    } catch (err) {
      console.error("Error placing order:", err);
      res.status(500).json({ error: "Failed to place order" });
    }
  });

  // GET /orders – list all orders (for checking in Postman / browser)
  router.get("/", async (req, res) => {
    try {
      const orders = await ordersCollection.find().toArray();
      res.json(orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  return router;
}
