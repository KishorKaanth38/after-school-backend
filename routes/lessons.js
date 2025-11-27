// routes/lessons.js
import express from "express";
import { ObjectId } from "mongodb";

export default function createLessonsRouter(db) {
  const router = express.Router();
  const lessonsCollection = db.collection("lessons");

  // GET /lessons – all lessons
  router.get("/", async (req, res) => {
    try {
      const lessons = await lessonsCollection.find().toArray();
      res.json(lessons);
    } catch (err) {
      console.error("Error fetching lessons:", err);
      res.status(500).json({ error: "Failed to fetch lessons" });
    }
  });

  // GET /lessons/:id – single lesson (optional but useful)
  router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const lesson = await lessonsCollection.findOne({
        _id: new ObjectId(id),
      });

      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }

      res.json(lesson);
    } catch (err) {
      console.error("Error fetching lesson:", err);
      res.status(500).json({ error: "Failed to fetch lesson" });
    }
  });

  // PUT /lessons/:id – update spaces (used after order)
  router.put("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const { spaces } = req.body;

      if (typeof spaces !== "number") {
        return res.status(400).json({ error: "Spaces must be a number" });
      }

      const result = await lessonsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { spaces } }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Lesson not found" });
      }

      res.json({ message: "Lesson updated", modifiedCount: result.modifiedCount });
    } catch (err) {
      console.error("Error updating lesson:", err);
      res.status(500).json({ error: "Failed to update lesson" });
    }
  });

  return router;
}
