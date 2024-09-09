// emailService.js
const nodemailer = require("nodemailer");

// Configure the transport service
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_USER,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    console.log("Sending email...");
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender address
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
