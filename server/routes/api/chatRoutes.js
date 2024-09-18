const express = require("express");
const chatController = require("../../controllers/chatController");
const notificationController = require("../../");

const router = express.Router();

// Route to send a message
router.post("/send-message", chatController.sendMessage);

// Route to fetch chat history between two users
router.get("/history/:senderId/:recipientId", chatController.fetchChatHistory);

// Route to update a user's online/offline status
router.post("/status", chatController.updateUserStatus);

// Route to fetch unread notifications for a user
// router.get("/notifications/:userId", notificationController.fetchNotifications);

module.exports = router;
