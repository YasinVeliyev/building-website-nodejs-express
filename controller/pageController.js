const path = require("path");

const { validationResult } = require("express-validator");

const FeedbackService = require("../services/FeedbackService");
const SpeakerService = require("../services/SpeakerService");

const feedbackService = new FeedbackService(path.join(path.resolve(path.dirname(".")), "data", "feedback.json"));
const speakersService = new SpeakerService(path.join(path.resolve(path.dirname(".")), "data", "speakers.json"));

const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => next(err));
    };
};

exports.indexPage = catchAsync(async (req, res, next) => {
    const speakers = await speakersService.getData();
    if (!req.session.visitCount) {
        req.session.visitCount = 1;
    } else {
        req.session.visitCount = req.session.visitCount + 1;
    }
    return res.render("index", { pageTitle: "Welcome", speakers });
});

exports.speakersPage = catchAsync(async (req, res) => {
    const speakers = await speakersService.getList();

    res.locals.speakers = speakers;
    return res.render("speakers", { pageTitle: "Speakers", speakers });
});

exports.feedbackPage = catchAsync(async (req, res, next) => {
    const feedbacks = await feedbackService.getList();
    const speakers = await speakersService.getList();
    const errors = req.session.feedback ? req.session.feedback.errors : false;
    req.session.feedback = {};
    const { name, email, title, message } = req.body;
    await feedbackService.addEntry({ name, email, title, message });i
    return res.render("feedback", { pageTitle: "Feedback", speakers, errors });
});

exports.getSpeakerInfo = catchAsync(async (req, res) => {
    const speakers = await speakersService.getData();

    let speaker = speakers.filter((speaker) => speaker.shortname == req.params.shortname)[0];
    console.log(speaker);
    return res.render("speaker_info", { pageTitle: "Speaker Info", speaker, speakers });
});

exports.postFeedback = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.feedback = {
            errors: errors.array(),
        };
        return res.redirect("/feedback");
    }
    const feedbacks = await feedbackService.getList();
    console.dir(req.body);
    return res.redirect("/");
});
