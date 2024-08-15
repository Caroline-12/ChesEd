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
  documents: [
    {
      type: String, // This will store file paths or URLs of submitted documents
    },
  ],
  balance: { type: Number, default: 0 },
  profilePicture: String,
});

module.exports = mongoose.model("User", userSchema);
