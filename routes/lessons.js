import express from "express";
import Lesson from "../models/Lesson.js";

const router = express.Router();

// GET all lessons
router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
});

// PUT - update lesson spaces (REQUIRED for coursework)
router.put("/:id", async (req, res) => {
  try {
    const lessonId = req.params.id;
    const { spaces } = req.body;

    const updatedLesson = await Lesson.findByIdAndUpdate(
      lessonId,
      { spaces: spaces },
      { new: true }
    );

    if (!updatedLesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    res.json({
      message: "Lesson updated successfully",
      lesson: updatedLesson
    });

  } catch (err) {
    console.error("PUT /lessons error:", err);
    res.status(500).json({ error: "Failed to update lesson" });
  }
});

export default router;
