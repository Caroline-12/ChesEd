const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
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
  educationLevel: String,
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
