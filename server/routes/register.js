const express = require("express");
const router = express.Router();
const registerTutorController = require("../controllers/registerTutorController");
const registerStudentController = require("../controllers/registerStudentController");

router.post("/", registerStudentController.handleNewUser);
router.post("/tutor", registerTutorController.handleNewUser);

module.exports = router;
