const path = require("path");
const FeedbackService = require("../services/FeedbackService");
const SpeakerService = require("../services/SpeakerService");

const feedbackService = new FeedbackService(path.join(path.resolve(path.dirname(".")), "data", "feedback.json"));
const speakersService = new SpeakerService(path.join(path.resolve(path.dirname(".")), "data", "speakers.json"));

exports.indexPage = (req, res) => {
    if (!req.session.visitCount) {
        req.session.visitCount = 1;
    } else {
        req.session.visitCount = req.session.visitCount + 1;
    }
    return res.render("index", { pageTitle: "Welcome" });
};

exports.speakersPage = async (req, res) => {
    const speakers = await speakersService.getList();
    // return res.json(speakers);
    return res.render("speakers", { pageTitle: "Speakers", speakers });
};

exports.feedbackPage = async (req, res) => {
    const feedbacks = await feedbackService.getList();
    // return res.json(feedbacks);
    return res.render("feedback", { pageTitle: "Feedback" });
};
