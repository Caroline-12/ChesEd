const express = require("express");
const router = express.Router();
const lessonController = require("../../controllers/lessonController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Tutor),
    lessonController.getAllLessons
  )
  .post(verifyRoles(ROLES_LIST.User), lessonController.createLesson)
  // .put(verifyRoles(ROLES_LIST.User), lessonController.updatelesson)
  .delete(verifyRoles(ROLES_LIST.Admin), lessonController.deleteLesson);
router
  .route("/assign")
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Tutor),
    lessonController.assignTutor
  );

router
  .route("/pendinglessons")
  .get(verifyRoles(ROLES_LIST.Tutor), lessonController.getPendingLessons);

router.route("/:lessonId").get(lessonController.getLesson);
// .put(
//   verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Tutor),
//   lessonController.updatelesson
// );

router
  .route("/student/:studentId")
  .get(verifyRoles(ROLES_LIST.User), lessonController.getLessonsByStudentId);

router
  .route("/category/:category")
  .get(verifyRoles(ROLES_LIST.Tutor), lessonController.getLessonsByCategory);

router
  .route("/changeprice")
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Tutor),
    lessonController.changeLessonPrice
  );

router
  .route("/deleteAll")
  .delete(verifyRoles(ROLES_LIST.Admin), lessonController.deleteAllLessons);

router
  .route("/submit-lesson/:lessonId")
  .post(verifyRoles(ROLES_LIST.Tutor), lessonController.submitLesson);

router
  .route("/tutor/:tutorId")
  .get(verifyRoles(ROLES_LIST.Tutor), lessonController.getLessonsForTutor);

router
  .route("/tutor/:tutorId/ongoing")
  .get(verifyRoles(ROLES_LIST.Tutor), lessonController.getOngoingLessonsForTutor);

router
  .route("/tutor/:tutorId/completed")
  .get(verifyRoles(ROLES_LIST.Tutor), lessonController.getCompleteLessonsForTutor);

router
  .route("/complete")
  .put(verifyRoles(ROLES_LIST.Tutor), lessonController.completeLesson);

router
  .route("/:lessonId/payment-status")
  .patch(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Tutor),
    lessonController.changePaymentStatus
  );
router
  .route("/:lessonId/tutor-proposal")
  .post(verifyRoles(ROLES_LIST.Tutor), lessonController.submitTutorProposal);

router
  .route("/:lessonId/student-response")
  .post(verifyRoles(ROLES_LIST.User), lessonController.respondToProposal);

module.exports = router;
