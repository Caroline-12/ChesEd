const User = require("../model/User");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

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

    (async function () {
      const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ["fidelotieno11@gmail.com"],
        subject: "Tutor Approval",
        html: `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Welcome to Chesed</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            color: #4CAF50;
          }
          .content {
            margin-top: 20px;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Chesed!</h1>
          </div>
          <div class="content">
            <p>Dear Tutor,</p>
            <p>We are thrilled to inform you that you have been successfully onboarded as a tutor in Chesed. Congratulations and welcome to our community!</p>
            <p>As a tutor, you will have the opportunity to share your knowledge and expertise with students who are eager to learn. We believe that your contribution will make a significant impact on their educational journey.</p>
            <p>If you have any questions or need assistance, please do not hesitate to reach out to our support team at support@chesed.com.</p>
            <p>Thank you for joining us, and we look forward to seeing the positive influence you will have on our students.</p>
            <p>Best regards,</p>
            <p>The Chesed Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2023 Chesed. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html> `,
      });

      if (error) {
        return console.error({ error });
      }

      console.log({ data });
    })();

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
