const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  roles: {
    User: Number,
    Tutor: Number,
    Admin: Number,
  },
  bio: String,
  password: {
    type: String,
    required: true,
  },
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  completedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  assignments: [{ type: Schema.Types.ObjectId, ref: "Assignment" }],
  bio: String,
  dateOfBirth: Date,
  refreshToken: String,

  tutorStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  specialization: [
    {
      type: String,
    },
  ],
  profilePhoto: {
    type: String,
    default: "uploads/default.jpg",
  },
  governmentId: {
    type: String,
  },
  documents: [
    {
      type: String,
    },
  ],
  balance: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
