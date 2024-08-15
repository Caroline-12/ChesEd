const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    // required: true,
  },
  //   createdBy: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     required: true,
  //   },
  //   createdAt: {
  //     type: Date,
  //     default: Date.now,
  //   },
});

module.exports = mongoose.model("Category", categorySchema);
