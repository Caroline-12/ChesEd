const Lesson = require("../model/Lesson");
const User = require("../model/User");
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
    cb(null, file.originalname); // Appending extension
  },
});

const upload = multer({ storage: storage });

// Middleware to handle file upload
const uploadMiddleware = upload.single("file");

const createLesson = async (req, res) => {
  console.log(req.body);
  uploadMiddleware(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "File upload error" });
    } else if (err) {
      return res
        .status(500)
        .json({ message: "Unknown error occurred during file upload" });
    }

    const {
      title,
      description,
      category,
      proposedBudget,
      dueDate,
      studentId,
      modeOfDelivery,
      paymentStatus,
    } = req.body;
    console.log(req.body);
    if (
      !title ||
      !description ||
      !category ||
      !proposedBudget ||
      !dueDate ||
      !studentId ||
      !modeOfDelivery ||
      !paymentStatus
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const newLesson = await Lesson.create({
        title,
        description,
        category,
        proposedBudget,
        documents: req.file ? req.file.path : null,
        student: studentId,
        dueDate,
        modeOfDelivery,
      });

      (async function () {
        const { data, error } = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: ["fidelotieno11@gmail.com"],
          subject: "Lesson Request Submitted Successfully",
          html: `
            <h1>Lesson Request Submitted</h1>
            <p>Dear Student,</p>
            <p>We are pleased to inform you that your lesson request titled "<strong>${title}</strong>" has been successfully submitted.</p>
            <p>Our team will review your request and get back to you shortly.</p>
            <p>Thank you for choosing our service!</p>
            <p>Best regards,</p>
            <p>The ChesEd Team</p>
          `,
        });

        if (error) {
          return console.error({ error });
        }

        console.log({ data });
      })();

      res.status(201).json(newLesson);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create Lesson" });
    }
  });
};

const getLessonsByCategory = async (req, res) => {
  const { category } = req.params;
  const { tutorId } = req.query;

  try {
    const tutor = await User.findById(tutorId);
    if (!tutor || !tutor.roles.Tutor) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const lessons = await Lesson.find({ category, status: "pending" })
      .populate("student", "username")
      .sort({ createdAt: -1 });

    res.json(lessons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch Lessons" });
  }
};

const changeLessonPrice = async (req, res) => {
  const { lessonId, agreedPrice } = req.body;
  console.log(req.body);
  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    lesson.agreedPrice = agreedPrice;
    lesson.status = "in_progress";
    await lesson.save();

    res.json(lesson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update Lesson price" });
  }
};

// change the status of the Lesson to completed
const completeLesson = async (req, res) => {
  const { lessonId } = req.body;
  console.log(req.body);
  console.log(lessonId);

  if (!lessonId) {
    return res.status(400).json({ message: "Lesson ID is required" });
  }

  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    lesson.status = "completed";
    const updatedLesson = await lesson.save();
    res.json(updatedLesson);
  } catch (err) {}
};

const assignTutor = async (req, res) => {
  const { lessonId, tutorId, assignee } = req.body;
  console.log(req.body);

  if (!lessonId || !tutorId) {
    return res
      .status(400)
      .json({ message: "Lesson ID and Tutor ID are required" });
  }

  try {
    const lesson = await Lesson.findById(lessonId);
    console.log(lesson);
    if (!lesson) {
      return res.status(404).json({ message: "lesson not found" });
    }

    lesson.tutor = tutorId;
    lesson.admin = assignee;
    lesson.status = "in_progress";
    lesson.agreement.status = "pending";

    const updatedLesson = await lesson.save();
    res.json(updatedLesson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to assign tutor" });
  }
};

const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find()
      .populate("student", "username email")
      .populate("tutor", "username")
      .populate("admin", "username");
    res.json(lessons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch Lessons" });
  }
};

// New function to handle tutor's proposal
const submitTutorProposal = async (req, res) => {
  const { lessonId } = req.params;
  const { price } = req.body;
  const tutorId = req.userId; // Assuming you have middleware that sets userId

  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    lesson.agreement = {
      status: "pending",
      tutorProposal: {
        price,
        proposedAt: new Date(),
      },
    };
    lesson.tutor = tutorId;

    const updatedLesson = await lesson.save();
    res.json(updatedLesson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit tutor proposal" });
  }
};

// New function to handle student's response to proposal
const respondToProposal = async (req, res) => {
  const { lessonId } = req.params;
  const { accepted } = req.body;
  const studentId = req.userId; // Assuming you have middleware that sets userId

  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // if (lesson.student.toString() !== studentId) {
    //   return res.status(403).json({ message: "Unauthorized" });
    // }

    lesson.agreement.status = accepted ? "accepted" : "rejected";
    lesson.agreement.studentResponse = {
      accepted,
      respondedAt: new Date(),
    };

    if (accepted) {
      lesson.status = "in_progress";
      lesson.agreedPrice = lesson.agreement.tutorProposal.price;
    }

    const updatedLesson = await lesson.save();
    res.json(updatedLesson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to respond to proposal" });
  }
};

// get all pending Lessons
const getPendingLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ status: "pending" })
      .populate("student", "username")
      .populate("tutor", "username")
      .populate("admin", "username");
    res.json(lessons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch Lessons" });
  }
};

// Fetch all Lessons for a specific tutor
const getLessonsForTutor = async (req, res) => {
  const { tutorId } = req.params;

  if (!tutorId) {
    return res.status(400).json({ message: "Tutor ID is required" });
  }

  try {
    const lessons = await Lesson.find({
      tutor: tutorId,
    })
      .populate("student", "username email")
      .populate("admin", "username")
      .populate("tutor", "username")
      .sort({ createdAt: -1 });

    res.json(lessons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch completed Lessons" });
  }
};

const getLessonsByStudentId = async (req, res) => {
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  try {
    const lessons = await Lesson.find({ student: studentId })
      .populate("student", "username")
      .populate("tutor", "username")
      .populate("admin", "username");
    res.json(lessons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch Lessons" });
  }
};

const updateLesson = async (req, res) => {
  const { lessonId, title, description, price, dueDate } = req.body;
  console.log(req.body);
  if (!lessonId || !title || !description || !price || !dueDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    lesson.title = title;
    lesson.description = description;
    lesson.price = price;
    lesson.dueDate = dueDate;

    const updatedLesson = await lesson.save();
    res.json(updatedLesson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update Lesson" });
  }
};

const deleteLesson = async (req, res) => {
  const { lessonId } = req.body;

  if (!lessonId) {
    return res.status(400).json({ message: "Lesson ID is required" });
  }

  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    await lesson.remove();
    res.json({ message: "Lesson deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete Lesson" });
  }
};

// change the payment status of a lesson
const changePaymentStatus = async (req, res) => {
  const { lessonId } = req.body;

  if (!lessonId) {
    return res.status(400).json({ message: "Lesson ID is required" });
  }

  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    lesson.paymentStatus = true;
    const updatedLesson = await lesson.save();
    res.json(updatedLesson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update payment status" });
  }
};

// get Lesson by ID
const getLesson = async (req, res) => {
  const { lessonId } = req.params;

  if (!lessonId) {
    return res.status(400).json({ message: "Lesson ID is required" });
  }

  try {
    const lesson = await Lesson.findById(lessonId)
      .populate("student", "username email")
      .populate("tutor", "username email")
      .populate("admin", "username");
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json(lesson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch Lesson" });
  }
};
// get agreed price of a lesson
const getAgreedPrice = async (req, res) => {
  const { lessonId } = req.params;

  if (!lessonId) {
    return res.status(400).json({ message: "Lesson ID is required" });
  }

  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json({ agreedPrice: lesson.agreedPrice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch Lesson" });
  }
};

// delete all Lessons
const deleteAllLessons = async (req, res) => {
  try {
    const result = await Lesson.deleteMany();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete Lessons" });
  }
};

const submitLesson = async (req, res) => {
  const { meetingUrl } = req.body;
  const { lessonId } = req.params;
  console.log(req.file);
  console.log(LessonId);
  if (!lessonId) {
    return res.status(400).json({ message: "Lesson ID is required" });
  }

  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // Embed the uploadMiddleware function here
    uploadMiddleware(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: "File upload error" });
      } else if (err) {
        return res
          .status(500)
          .json({ message: "Unknown error occurred during file upload" });
      }

      if (req.file) {
        // If a file is uploaded, store the file path
        lesson.lesson.push(req.file.path);
      } else if (meetingUrl) {
        // If a meeting URL is provided, store the URL
        lesson.lesson.push(meetingUrl);
      } else {
        return res.status(400).json({ message: "No lesson content provided" });
      }

      lesson.status = "completed"; // Mark the Lesson as completed
      const updatedLesson = await lesson.save();

      res.json(updatedLesson);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit lesson" });
  }
};

module.exports = {
  createLesson,
  getLessonsByCategory,
  changeLessonPrice,
  assignTutor,
  getAllLessons,
  // updateLesson,
  deleteLesson,
  getLesson,
  getLessonsByStudentId,
  deleteAllLessons,
  submitLesson,
  getPendingLessons,
  getLessonsForTutor,
  completeLesson,
  getAgreedPrice,
  changePaymentStatus,
  submitTutorProposal,
  respondToProposal,
};
