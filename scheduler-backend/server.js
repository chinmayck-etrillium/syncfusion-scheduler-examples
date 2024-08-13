const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3001;
const filePath = path.join(__dirname, "scheduleData.json");

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Endpoint to get schedule data
app.get("/api/schedule", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read data" });
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint to update schedule data
app.post("/api/schedule", (req, res) => {
  fs.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to write data" });
    }
    res.json({ message: "Data saved successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
