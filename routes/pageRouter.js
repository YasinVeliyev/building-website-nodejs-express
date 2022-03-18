const { check } = require("express-validator");
const { Router } = require("express");

const pageController = require("../controller/pageController");

const router = Router();

router.get("/", pageController.indexPage);
router.get("/speakers", pageController.speakersPage);
router
    .route("/feedback")
    .get(pageController.feedbackPage)
    .post(
        check("name").trim().isLength({ min: 3 }).escape().withMessage("A name is required"),
        check("email").trim().isEmail().escape().normalizeEmail().withMessage("A valid email adress is required"),
        check("title").trim().isLength({ min: 3 }).escape().withMessage("A title is required"),
        check("message").trim().isLength({ min: 3 }).escape().withMessage("A message is required"),
        pageController.postFeedback,
    );
router.get("/speakers/:shortname", pageController.getSpeakerInfo);
module.exports = router;
