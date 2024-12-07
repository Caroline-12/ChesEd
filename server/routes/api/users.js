const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const verifyJWT = require("../../middleware/verifyJWT");

// Protected routes that require authentication
router.use(verifyJWT);

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser)
  .put(usersController.uploadMiddleware, usersController.updateUser); // Allow authenticated users to update their profile

router
  .route("/students")
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllStudents);

router
  .route("/tutors")
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllTutors);

router
  .route("/admins")
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllAdmins);

router
  .route("/deleteAll")
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteAllUsers);

router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

module.exports = router;
