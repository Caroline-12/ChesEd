import express from "express";
import {
  createTutor,
  getTutors,
  getTutorById,
  updateTutor,
  deleteTutor,
} from "../controllers/tutorController.js";

const router = express.Router();

router.post("/", createTutor);
router.get("/", getTutors);
router.get("/:id", getTutorById);
router.put("/:id", updateTutor);
router.delete("/:id", deleteTutor);

export default router;
