const { Router } = require("express");

const pageController = require("../controller/pageController");

const router = Router();

router.get("/", pageController.indexPage);
router.get("/speakers", pageController.speakersPage);
router.get("/feedback", pageController.feedbackPage);

module.exports = router;
