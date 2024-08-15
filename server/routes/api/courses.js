const express = require("express");
const router = express.Router();
const coursesController = require("../../controllers/coursesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Tutor),
    coursesController.createNewCourse
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Tutor),
    coursesController.updateCourse
  )
  .delete(verifyRoles(ROLES_LIST.Admin), coursesController.deleteCourse);

router.route("/:id").get(coursesController.getCourse);

module.exports = router;
