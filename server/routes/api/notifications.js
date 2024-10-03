const express = require("express");
const router = express.Router();
const Notification = require("../../model/Notification"); // You'll need to create this model

// POST /notifications
router.post("/", async (req, res) => {
  try {
    const newNotification = new Notification({
      ...req.body,
      user: req.user.id, // Assuming your auth middleware adds the user to the request
    });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
