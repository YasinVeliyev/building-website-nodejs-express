const express = require("express");

const app = express();

app.get("/", (req, res) => {
    return res.send("Hello Express");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});