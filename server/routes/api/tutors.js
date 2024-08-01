const express = require("express");
const router = express.Router();
const tutorsController = require("../../controllers/tutorsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), tutorsController.getAllTutors);
// .delete(verifyRoles(ROLES_LIST.Admin), tutorsController.deleteUser)
// .put(verifyRoles(ROLES_LIST.Admin), tutorsController.updateUser);

// router
//   .route("/:id")
//   .get(verifyRoles(ROLES_LIST.Admin), tutorsController.getUser);

module.exports = router;
