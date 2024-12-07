const User = require("../model/User");
const multer = require("multer");
const path = require("path");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using timestamp and original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Middleware to handle file upload
const uploadMiddleware = upload.single("profilePhoto"); // Changed to match client-side field name

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

// Get all admins
const getAllAdmins = async (req, res) => {
  console.log("Getting all admins");
  const users = await User.find({ "roles.Admin": { $exists: true } });
  if (!users || users.length === 0) {
    return res.status(204).json({ message: "No users with Admin role found" });
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
  try {
    console.log('Update user request body:', req.body);
    console.log('Update user request file:', req.file);
    
    const {
      id,
      firstName,
      lastName,
      email,
      bio,
      specialization,
      calendlyProfile,
    } = req.body;

    if (!id) {
      console.log('No ID provided in request');
      return res.status(400).json({ message: "User ID required" });
    }

    const user = await User.findOne({ _id: id }).exec();
    if (!user) {
      console.log(`User ID ${id} not found`);
      return res.status(404).json({ message: `User ID ${id} not found` });
    }

    // Update each field if provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (specialization) {
      try {
        // Handle specialization as JSON string if needed
        user.specialization = typeof specialization === 'string' 
          ? JSON.parse(specialization) 
          : specialization;
      } catch (err) {
        console.error('Error parsing specialization:', err);
        return res.status(400).json({ message: "Invalid specialization format" });
      }
    }
    if (calendlyProfile) user.calendlyProfile = calendlyProfile;
    
    // Handle profile photo if uploaded
    if (req.file) {
      const filePath = `/uploads/${req.file.filename}`;
      console.log('Setting profile photo path:', filePath);
      user.profilePhoto = filePath;
    }

    console.log('Saving updated user:', user);
    const updatedUser = await user.save();
    console.log('User updated successfully:', updatedUser);
    res.json(updatedUser);
  } catch (err) {
    console.error('Error in updateUser:', err);
    res.status(500).json({ 
      message: "Failed to update user",
      error: err.message 
    });
  }
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
  getAllAdmins,
  uploadMiddleware
};
