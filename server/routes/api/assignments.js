const express = require("express");
const router = express.Router();
const assignmentController = require("../../controllers/assignmentController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), assignmentController.getAllAssignments)
  .post(verifyRoles(ROLES_LIST.User), assignmentController.createAssignment)
  .put(verifyRoles(ROLES_LIST.User), assignmentController.updateAssignment)
  .delete(verifyRoles(ROLES_LIST.Admin), assignmentController.deleteAssignment);
router
  .route("/assign")
  .put(verifyRoles(ROLES_LIST.Admin), assignmentController.assignTutor);

router
  .route("/:assignmentId")
  .get(verifyRoles(ROLES_LIST.User), assignmentController.getAssignment);

router
  .route("/student/:studentId")
  .get(
    verifyRoles(ROLES_LIST.User),
    assignmentController.getAssignmentsByStudentId
  );

module.exports = router;
