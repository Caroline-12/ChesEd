const express = require("express");
const router = express.Router();
const tutorsController = require("../../controllers/tutorsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), tutorsController.getApprovedTutors);

// router
//   .route("/alltutors")
//   .get(verifyRoles(ROLES_LIST.Admin), tutorsController.getAllTutors);

router
  .route("/pending")
  .get(verifyRoles(ROLES_LIST.Admin), tutorsController.getPendingTutors);

router
  .route("/approve")
  .put(verifyRoles(ROLES_LIST.Admin), tutorsController.approveTutor);

router
  .route("/reject")
  .post(verifyRoles(ROLES_LIST.Admin), tutorsController.rejectTutor);
// .delete(verifyRoles(ROLES_LIST.Admin), tutorsController.deleteUser)
// .put(verifyRoles(ROLES_LIST.Admin), tutorsController.updateUser);

// router
//   .route("/:id")
//   .get(verifyRoles(ROLES_LIST.Admin), tutorsController.getUser);

module.exports = router;
