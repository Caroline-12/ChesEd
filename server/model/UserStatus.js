const mongoose = require("mongoose");

const userStatusSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isOnline: { type: Boolean, default: false },
  lastSeen: { type: Date }, // Timestamp for when the user was last online
});

module.exports = mongoose.model("UserStatus", userStatusSchema);
