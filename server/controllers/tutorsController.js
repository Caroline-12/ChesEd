const User = require("../model/User");

const getAllTutors = async (req, res) => {
  console.log("Getting all tutors");
  const users = await User.find({ "roles.Tutor": { $exists: true } });
  if (!users || users.length === 0) {
    return res.status(204).json({ message: "No users with Tutor role found" });
  }
  res.json(users);
};

const getApprovedTutors = async (req, res) => {
  try {
    const approvedTutors = await User.find({
      "roles.Tutor": { $exists: true },
      tutorStatus: "approved",
    });
    res.json(approvedTutors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch approved tutors" });
  }
};

const getPendingTutors = async (req, res) => {
  try {
    const pendingTutors = await User.find({
      "roles.Tutor": { $exists: true },
      tutorStatus: "pending",
    });
    res.json(pendingTutors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch pending tutors" });
  }
};

const approveTutor = async (req, res) => {
  const { tutorId } = req.body;

  try {
    const tutor = await User.findById(tutorId);
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    tutor.tutorStatus = "approved";
    await tutor.save();

    res.json({ message: "Tutor approved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to approve tutor" });
  }
};

const rejectTutor = async (req, res) => {
  const { tutorId } = req.body;

  try {
    const tutor = await User.findById(tutorId);
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    tutor.tutorStatus = "rejected";
    await tutor.save();

    res.json({ message: "Tutor rejected successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to reject tutor" });
  }
};

// get a specific tutor
const getTutor = async (req, res) => {
  if (!req?.params?.tutorId) {
    return res.status(400).json({ message: "Missing!! Tutor ID required" });
  }
  try {
    const tutor = await User.findById(req.params.tutorId);
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    res.json(tutor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tutor" });
  }
};

// get tutors of a certain category
const getTutorsByCategory = async (req, res) => {
  const { categoryId } = req.body;
  console.log("Getting tutors with category ID:", categoryId);
  try {
    const tutors = await User.find({
      "roles.Tutor": { $exists: true },
      specialization: categoryId,
    });
    if (!tutors || tutors.length === 0) {
      return res.status(204).json({ message: "No tutors found" });
    }
    res.json(tutors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tutors" });
  }
};

module.exports = {
  getAllTutors,
  getPendingTutors,
  approveTutor,
  rejectTutor,
  getApprovedTutors,
  getTutor,
  getTutorsByCategory,
};
