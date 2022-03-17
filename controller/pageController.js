const path = require("path");
const FeedbackService = require("../services/FeedbackService");
const SpeakerService = require("../services/SpeakerService");

const feedbackService = new FeedbackService(path.join(path.resolve(path.dirname(".")), "data", "feedback.json"));
const speakersService = new SpeakerService(path.join(path.resolve(path.dirname(".")), "data", "speakers.json"));

exports.indexPage = async (req, res) => {
    const speakers = await speakersService.getData();
    console.log(speakers);
    if (!req.session.visitCount) {
        req.session.visitCount = 1;
    } else {
        req.session.visitCount = req.session.visitCount + 1;
    }
    return res.render("index", { pageTitle: "Welcome", speakers });
};

exports.speakersPage = async (req, res) => {
    const speakers = await speakersService.getList();

    res.locals.speakers = speakers;
    return res.render("speakers", { pageTitle: "Speakers", speakers });
};

exports.feedbackPage = async (req, res) => {
    const feedbacks = await feedbackService.getList();
    // return res.json(feedbacks);
    return res.render("feedback", { pageTitle: "Feedback" });
};

exports.getSpeakerInfo = async (req, res) => {
    const speakers = await speakersService.getData();
    let speaker = speakers.filter((speaker) => speaker.shortname == req.params.shortname)[0];
    console.log(speaker);
    return res.render("speaker_info", { pageTitle: "Speaker Info", speaker, speakers });
};
