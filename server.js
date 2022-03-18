const path = require("node:path");
const express = require("express");
const cookieSession = require("cookie-session");

const pageRouter = require("./routes/pageRouter");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("trust proxy", 1);

app.use(express.static("static"));
app.use(
    cookieSession({
        name: "session",
        keys: ["key1", "key2"],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.locals.siteName = "Roux Meetups";

app.use((req, res, next) => {
    res.locals.variable = "hello";
    return next();
});

app.use(pageRouter);

app.use((err, req, res, next) => {
    res.status(404).render("error", { pageTitle: "Error", speakers: undefined });
});
app.use((req, res) => {
    res.status(404).send("Not Found");
});
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejectionError", (err) => console.err(err));
