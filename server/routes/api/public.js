const express = require("express");
const router = express.Router();
const coursesController = require("../../controllers/coursesController");

router.route("/").get(coursesController.getPopularCourses);

module.exports = router;
