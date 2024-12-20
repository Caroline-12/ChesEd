const User = require("../model/User");
const multer = require("multer");
const path = require("path");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this directory exists
  },
  filename: function (req, profilePhoto, cb) {
    cb(null, profilePhoto.originalname); // Appending extension
  },
});

const upload = multer({ storage: storage });

// Middleware to handle file upload
const uploadMiddleware = upload.single("ProfilePhoto");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

const getAllTutors = async (req, res) => {
  console.log("Getting all tutors");
  const users = await User.find({ "roles.Tutor": { $exists: true } });
  if (!users || users.length === 0) {
    return res.status(204).json({ message: "No users with Tutor role found" });
  }
  res.json(users);
};

const getAllStudents = async (req, res) => {
  console.log("Getting all tutors");
  const users = await User.find({ "roles.User": { $exists: true } });
  if (!users || users.length === 0) {
    return res.status(204).json({ message: "No users with Tutor role found" });
  }
  res.json(users);
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(user);
};

const updateUser = async (req, res) => {
  uploadMiddleware(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "ProfilePhoto upload error" });
    } else if (err) {
      return res
        .status(500)
        .json({ message: "Unknown error occurred during file upload" });
    }
    const {
      id,
      name,
      email,
      bio,
      specialization,
      calendlyProfile,
      profilePhoto,
    } = req.body;

    // what is the path of the uploaded file
    console.log(req.ProfilePhoto.path);

    if (!id) return res.status(400).json({ message: "User ID required" });

    const user = await User.findOne({ _id: id }).exec();
    if (!user) {
      return res.status(204).json({ message: `User ID ${id} not found` });
    }

    // Update each field if provided, else retain the existing values
    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.specialization = specialization || user.specialization;
    user.calendlyProfile = calendlyProfile || user.calendlyProfile;
    user.profilePhoto = req.ProfilePhoto
      ? req.ProfilePhoto.path
      : null || user.profilePhoto;

    try {
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to update user profile", error: err });
    }
  });
};

// delete all users
const deleteAllUsers = async (req, res) => {
  const result = await User.deleteMany();
  res.json(result);
};

// delete all tutors
// const deleteAllTutors = async (req, res) => {
//   const result = await User.deleteMany({ "roles.Tutor": { $exists: true } });
//   res.json(result);
// };

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
  getAllTutors,
  getAllStudents,
  deleteAllUsers,
  // deleteAllTutors,
};
