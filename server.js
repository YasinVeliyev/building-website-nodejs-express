const path = require("node:path");
const express = require("express");
const cookieSession = require("cookie-session");

const pageRouter = require("./routes/pageRouter");
const app = express();

app.use(express.static("static"));
app.use(
    cookieSession({
        name: "session",
        keys: ["key1", "key2"],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }),
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("trust proxy", 1);

app.use(pageRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
