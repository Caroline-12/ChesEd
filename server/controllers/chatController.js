const Chat = require("../model/Chat");
const User = require("../model/User");

const createChat = async (req, res) => {
  const { participantIds, assignmentId } = req.body;

  try {
    const newChat = await Chat.create({
      participants: participantIds,
      assignment: assignmentId,
    });

    res.status(201).json(newChat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create chat" });
  }
};

const getChats = async (req, res) => {
  const { userId } = req.params;

  try {
    const chats = await Chat.find({ participants: userId })
      .populate("participants", "username")
      .populate("assignment", "title");

    res.json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch chats" });
  }
};

const sendMessage = async (req, res) => {
  const { chatId, senderId, content } = req.body;

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.messages.push({ sender: senderId, content });
    await chat.save();

    res.status(201).json(chat.messages[chat.messages.length - 1]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send message" });
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await Chat.findById(chatId).populate(
      "messages.sender",
      "username"
    );

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json(chat.messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

module.exports = {
  createChat,
  getChats,
  sendMessage,
  getMessages,
};
