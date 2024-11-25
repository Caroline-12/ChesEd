const express = require("express");
const router = express.Router();
const tutorsController = require("../../controllers/tutorsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.route("/").get(tutorsController.getApprovedTutors);

// router
//   .route("/alltutors")
//   .get(verifyRoles(ROLES_LIST.Admin), tutorsController.getAllTutors);

router
  .route("/pending")
  .get(tutorsController.getPendingTutors);

  // .get(verifyRoles(ROLES_LIST.Admin), tutorsController.getPendingTutors);

router
  .route("/approve")
  .put(tutorsController.approveTutor);
  // .put(verifyRoles(ROLES_LIST.Admin), tutorsController.approveTutor);


router
  .route("/reject")
  .post( tutorsController.rejectTutor);
  // .post(verifyRoles(ROLES_LIST.Admin), tutorsController.rejectTutor);

// .delete(verifyRoles(ROLES_LIST.Admin), tutorsController.deleteUser)
// .put(verifyRoles(ROLES_LIST.Admin), tutorsController.updateUser);

router.route("/:tutorId").get(tutorsController.getTutor);

router
  .route("/tutors-by-category")
  .get(verifyRoles(ROLES_LIST.Admin), tutorsController.getTutorsByCategory);

module.exports = router;
