const Assignment = require("../model/Assignment");

const createAssignment = async (req, res) => {
  const { title, description, price, dueDate, studentId } = req.body;
  console.log(req.body);
  if (!title || !description || !price || !dueDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newAssignment = await Assignment.create({
      title,
      description,
      student: studentId,
      price,
      dueDate,
    });

    res.status(201).json(newAssignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create assignment" });
  }
};

const assignTutor = async (req, res) => {
  const { assignmentId, tutorId, assignee } = req.body;

  if (!assignmentId || !tutorId) {
    return res
      .status(400)
      .json({ message: "Assignment ID and Tutor ID are required" });
  }

  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    assignment.tutor = tutorId;
    assignment.admin = assignee;
    assignment.status = "assigned";

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

// Generate other necessary functions like updateAssignment, deleteAssignment
const updateAssignment = async (req, res) => {
  const { assignmentId, title, description, price, dueDate } = req.body;

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

module.exports = {
  createAssignment,
  assignTutor,
  getAllAssignments,
  updateAssignment,
  deleteAssignment,
  getAssignment,
};
