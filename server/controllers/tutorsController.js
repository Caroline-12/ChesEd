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

module.exports = {
  getAllTutors,
  getPendingTutors,
  approveTutor,
  rejectTutor,
  getApprovedTutors,
};
