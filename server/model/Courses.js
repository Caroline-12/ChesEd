const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tutor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  thumbnail: {
    type: String,
    default: "https://example.com/default-thumbnail.jpg",
  },
  category: {
    type: String,
    required: true,
  },
  tags: [String],
  duration: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      comment: String,
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
  ],
  isPublished: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Course", courseSchema);
