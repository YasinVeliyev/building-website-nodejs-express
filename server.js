const path = require("node:path");
const express = require("express");

const app = express();

app.use(express.static("static"));

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.get("/speakers", (req, res) => {
    return res.sendFile(path.join(__dirname, "static", "speakers.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
