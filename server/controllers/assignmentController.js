const Assignment = require("../model/Assignment");
const User = require("../model/User");
const multer = require("multer");
const path = require("path");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Appending extension
  },
});

const upload = multer({ storage: storage });

// Middleware to handle file upload
const uploadMiddleware = upload.single("file");

const createAssignment = async (req, res) => {
  console.log(req.body);
  uploadMiddleware(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "File upload error" });
    } else if (err) {
      return res
        .status(500)
        .json({ message: "Unknown error occurred during file upload" });
    }

    const { title, description, category, proposedBudget, dueDate, studentId } =
      req.body;
    console.log(req.body);
    if (
      !title ||
      !description ||
      !category ||
      !proposedBudget ||
      !dueDate ||
      !studentId
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const newAssignment = await Assignment.create({
        title,
        description,
        category,
        proposedBudget,
        documents: req.file ? req.file.path : null,
        student: studentId,
        dueDate,
      });

      res.status(201).json(newAssignment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create assignment" });
    }
  });
};

const getAssignmentsByCategory = async (req, res) => {
  const { category } = req.params;
  const { tutorId } = req.query;

  try {
    const tutor = await User.findById(tutorId);
    if (!tutor || !tutor.roles.Tutor) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const assignments = await Assignment.find({ category, status: "pending" })
      .populate("student", "username")
      .sort({ createdAt: -1 });

    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch assignments" });
  }
};

const changeAssignmentPrice = async (req, res) => {
  const { assignmentId, agreedPrice } = req.body;
  console.log(req.body);
  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    assignment.agreedPrice = agreedPrice;
    assignment.status = "in_progress";
    await assignment.save();

    res.json(assignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update assignment price" });
  }
};

const assignTutor = async (req, res) => {
  const { assignmentId, tutorId, assignee } = req.body;
  console.log(req.body);

  if (!assignmentId || !tutorId) {
    return res
      .status(400)
      .json({ message: "Assignment ID and Tutor ID are required" });
  }

  try {
    const assignment = await Assignment.findById(assignmentId);
    console.log(assignment);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    assignment.tutor = tutorId;
    assignment.admin = assignee;
    console.log(assignment.status);
    assignment.status = "in_progress";

    const updatedAssignment = await assignment.save();
    res.json(updatedAssignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to assign tutor" });
  }
};

const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("student", "username")
      .populate("tutor", "username")
      .populate("admin", "username");
    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch assignments" });
  }
};

const getAssignmentsByStudentId = async (req, res) => {
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  try {
    const assignments = await Assignment.find({ student: studentId })
      .populate("student", "username")
      .populate("tutor", "username")
      .populate("admin", "username");
    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch assignments" });
  }
};

const updateAssignment = async (req, res) => {
  const { assignmentId, title, description, price, dueDate } = req.body;
  console.log(req.body);
  if (!assignmentId || !title || !description || !price || !dueDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    assignment.title = title;
    assignment.description = description;
    assignment.price = price;
    assignment.dueDate = dueDate;

    const updatedAssignment = await assignment.save();
    res.json(updatedAssignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update assignment" });
  }
};

const deleteAssignment = async (req, res) => {
  const { assignmentId } = req.body;

  if (!assignmentId) {
    return res.status(400).json({ message: "Assignment ID is required" });
  }

  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    await assignment.remove();
    res.json({ message: "Assignment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete assignment" });
  }
};

// get assignment by ID
const getAssignment = async (req, res) => {
  const { assignmentId } = req.params;

  if (!assignmentId) {
    return res.status(400).json({ message: "Assignment ID is required" });
  }

  try {
    const assignment = await Assignment.findById(assignmentId)
      .populate("student", "username")
      .populate("tutor", "username")
      .populate("admin", "username");
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json(assignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch assignment" });
  }
};

// delete all assignments
const deleteAllAssignments = async (req, res) => {
  try {
    const result = await Assignment.deleteMany();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete assignments" });
  }
};

module.exports = {
  createAssignment,
  getAssignmentsByCategory,
  changeAssignmentPrice,
  assignTutor,
  getAllAssignments,
  // updateAssignment,
  deleteAssignment,
  getAssignment,
  getAssignmentsByStudentId,
  deleteAllAssignments,
};
