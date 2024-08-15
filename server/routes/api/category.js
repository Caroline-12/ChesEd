const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/categoriesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.route("/").post(categoryController.createCategory);

router.route("/").get(categoryController.getAllCategories);

router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.Admin), categoryController.getCategory);

router
  .route("/:id")
  .put(verifyRoles(ROLES_LIST.Admin), categoryController.updateCategory);

// router
//   .route("/pending")
//   .get(verifyRoles(ROLES_LIST.Admin), categoryController.getPendingTutors);

// router
//   .route("/approve")
//   .put(verifyRoles(ROLES_LIST.Admin), categoryController.approveTutor);

// router
//   .route("/reject")
//   .post(verifyRoles(ROLES_LIST.Admin), categoryController.rejectTutor);
// .delete(verifyRoles(ROLES_LIST.Admin), tutorsController.deleteUser)
// .put(verifyRoles(ROLES_LIST.Admin), tutorsController.updateUser);

// router
//   .route("/:id")
//   .get(verifyRoles(ROLES_LIST.Admin), tutorsController.getUser);

module.exports = router;
