const Message = require("../model/Chat");
const Notification = require("../model/Notification");
const UserStatus = require("../model/UserStatus");

// Function to send a message
const sendMessage = async (req, res) => {
  const { senderId, recipientId, content } = req.body;

  try {
    const newMessage = new Message({ senderId, recipientId, content });
    await newMessage.save();

    // Check if the recipient is online
    const recipientStatus = await UserStatus.findOne({ userId: recipientId });

    if (!recipientStatus || !recipientStatus.isOnline) {
      // Create a notification if the user is offline
      const newNotification = new Notification({
        userId: recipientId,
        messageId: newMessage._id,
      });
      await newNotification.save();
    }

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send message" });
  }
};

// Function to fetch chat history
const fetchChatHistory = async (req, res) => {
  const { senderId, recipientId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId, recipientId },
        { senderId: recipientId, recipientId: senderId },
      ],
    }).sort({ timestamp: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch chat history" });
  }
};

// Function to update user status (online/offline)
const updateUserStatus = async (req, res) => {
  const { userId, isOnline } = req.body;

  try {
    const userStatus = await UserStatus.findOneAndUpdate(
      { userId },
      { isOnline, lastSeen: isOnline ? null : Date.now() },
      { new: true, upsert: true }
    );

    return res.status(200).json({ userStatus });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update user status" });
  }
};

module.exports = {
  sendMessage,
  fetchChatHistory,
  updateUserStatus,
};
