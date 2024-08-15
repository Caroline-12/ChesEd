const express = require("express");
const router = express.Router();
const assignmentController = require("../../controllers/assignmentController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Tutor),
    assignmentController.getAllAssignments
  )
  .post(verifyRoles(ROLES_LIST.User), assignmentController.createAssignment)
  // .put(verifyRoles(ROLES_LIST.User), assignmentController.updateAssignment)
  .delete(verifyRoles(ROLES_LIST.Admin), assignmentController.deleteAssignment);
router
  .route("/assign")
  .put(verifyRoles(ROLES_LIST.Admin), assignmentController.assignTutor);

router.route("/:assignmentId").get(assignmentController.getAssignment);
// .put(
//   verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Tutor),
//   assignmentController.updateAssignment
// );

router
  .route("/student/:studentId")
  .get(
    verifyRoles(ROLES_LIST.User),
    assignmentController.getAssignmentsByStudentId
  );

router
  .route("/category/:category")
  .get(
    verifyRoles(ROLES_LIST.Tutor),
    assignmentController.getAssignmentsByCategory
  );

router
  .route("/changeprice")
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Tutor),
    assignmentController.changeAssignmentPrice
  );
module.exports = router;
