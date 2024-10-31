const express = require("express");
const { sendEmail } = require("../../controllers/recoveryEmailController");

const router = express.Router();

router.route("/send_recovery_email").post(sendEmail);

module.exports = router;
