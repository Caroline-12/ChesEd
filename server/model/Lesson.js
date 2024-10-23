const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    proposedBudget: {
      type: Number,
      required: true,
    },
    documents: [
      {
        type: String, // This will store file paths or URLs
      },
    ],
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentEmail: {
      type: String,
      ref: "User",
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    agreedPrice: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    lesson: [{ type: String }],
    modeOfDelivery: {
      type: String,
      enum: ["online", "offline"],
    },
    timeOfPayment: {
      type: Date,
    },
    agreement: {
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
      tutorProposal: {
        price: Number,
        proposedAt: Date,
      },
      studentResponse: {
        accepted: Boolean,
        respondedAt: Date,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", LessonSchema);
