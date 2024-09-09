// emailNotifications.js
const sendEmail = require("./emailService");

const notifyStudentOfSubmission = async (studentEmail) => {
  const subject = "Lesson Submission Confirmation";
  const text = "Your lesson has been successfully submitted.";
  await sendEmail(studentEmail, subject, text);
};

const notifyTutorOfAssignment = async (tutorEmail) => {
  const subject = "New Lesson Assignment";
  const text = "You have been assigned a new lesson.";
  await sendEmail(tutorEmail, subject, text);
};

const notifyStudentOfCompletion = async (studentEmail) => {
  const subject = "Lesson Completed";
  const text = "Your lesson has been completed by the tutor.";
  await sendEmail(studentEmail, subject, text);
};

module.exports = {
  notifyStudentOfSubmission,
  notifyTutorOfAssignment,
  notifyStudentOfCompletion,
};
