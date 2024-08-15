const User = require("../model/User");
const bcrypt = require("bcrypt");
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

const handleNewUser = async (req, res) => {
  uploadMiddleware(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "File upload error" });
    } else if (err) {
      return res
        .status(500)
        .json({ message: "Unknown error occurred during file upload" });
    }

    const {
      email,
      pwd,
      username,
      firstName,
      lastName,
      roles,
      specialization,
      documents,
    } = req.body;

    console.log(req.body);
    if ((!username || !pwd || !email || !firstName || !lastName, !roles))
      return res.status(400).json({ message: "Please input all details." });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict

    try {
      //encrypt the password
      const hashedPwd = await bcrypt.hash(pwd, 10);

      //create and store the new user
      const result = await User.create({
        username,
        password: hashedPwd,
        email,
        firstName,
        lastName,
        roles,
        specialization,
        documents: req.file ? req.file.path : null,
      });

      console.log(result);

      res.status(201).json({ success: `New user ${firstName} created!` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};

module.exports = { handleNewUser };
