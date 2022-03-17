const { Router } = require("express");

const pageController = require("../controller/pageController");

const router = Router();

router.get("/", pageController.indexPage);
router.get("/speakers", pageController.speakersPage);
router.get("/feedback", pageController.feedbackPage);
router.get("/speakers/:shortname", pageController.getSpeakerInfo);
module.exports = router;
