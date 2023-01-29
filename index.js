const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hi");
});

app.get("/hello", (req, res) => {
    res.send("Hello");
});

app.get("/bonjour", (req, res) => {
    res.send("Bonjour");
});

// Remarquez que le `app.listen` doit se trouver après les déclarations des routes
app.listen(5000, () => {
    console.log("Server has started");
});