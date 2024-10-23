const User = require("../model/User");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Middleware to handle multiple file uploads
const uploadMiddleware = upload.fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "governmentId", maxCount: 1 },
  { name: "documents", maxCount: 5 },
]);

const handleNewUser = async (req, res) => {
  console.log("Received registration request");
  uploadMiddleware(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err);
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    } else if (err) {
      console.error("Unknown error:", err);
      return res.status(500).json({
        message: "Unknown error occurred during file upload",
        error: err.message,
      });
    }

    console.log("Request body:", req.body);
    console.log("Uploaded files:", req.files);

    const {
      email,
      pwd,
      username,
      firstName,
      lastName,
      roles,
      specialization,
      tutorStatus,
      teachingExperience,
      interests,
      strongestSubjects,
      englishProficiency,
    } = req.body;

    if (!username || !pwd || !email || !firstName || !lastName || !roles) {
      return res
        .status(400)
        .json({ message: "Please input all required details." });
    }

    // Check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409); // Conflict

    try {
      // Encrypt the password
      const hashedPwd = await bcrypt.hash(pwd, 10);

      // Prepare file paths
      const profilePhotoPath = req.files["profilePhoto"]
        ? req.files["profilePhoto"][0].path
        : null;
      const governmentIdPath = req.files["governmentId"]
        ? req.files["governmentId"][0].path
        : null;
      const documentPaths = req.files["documents"]
        ? req.files["documents"].map((file) => file.path)
        : [];

      // Create and store the new user
      const result = await User.create({
        username,
        password: hashedPwd,
        email,
        firstName,
        lastName,
        roles: JSON.parse(req.body.roles),
        specialization,
        tutorStatus,
        teachingExperience,
        interests,
        strongestSubjects,
        englishProficiency,
        profilePhoto: profilePhotoPath,
        governmentId: governmentIdPath,
        documents: documentPaths,
      });

      console.log(result);

      (async function () {
        const { data, error } = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: ["fidelotieno11@gmail.com"],
          subject: "Welcome to Chesed",
          html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Welcome to Chesed</title>
        </head>
        <body>
          <h1>Welcome to Chesed!</h1>
          <p>We are thrilled to have you join our community of passionate tutors and learners. Your journey towards making a difference in education starts here.</p>
          <p>Feel free to explore the platform, connect with other tutors, and start sharing your knowledge. If you have any questions or need assistance, our support team is here to help.</p>
          <p>Thank you for being a part of Chesed. Together, we can make learning more accessible and enjoyable for everyone.</p>
          <p>Best regards,</p>
          <p>The Chesed Team</p>
        </body>
        </html>`,
        });

        if (error) {
          return console.error({ error });
        }

        console.log({ data });
      })();

      res.status(201).json({ success: `New user ${firstName} created!` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};

module.exports = { handleNewUser };
