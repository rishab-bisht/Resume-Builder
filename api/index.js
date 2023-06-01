const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const Personal = require("./models/Personal");
const Objective = require("./models/Objective");
const Experience = require("./models/Experience");
const Education = require("./models/Education");
const app = express();
require("dotenv").config();
const port = 4000;
mongoose.connect(process.env.MONGO_URL);
// console.log(process.env.MONGO_URL)

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

app.get("/api/test", (req, res) => {
  res.json("Test Ok");
});
app.post("/api/personal", async (req, res) => {
  const { name, email, address, phone, website, linked } = req.body;

  try {
    const postData = await Personal.create({
      name,
      email,
      address,
      phone,
      website,
      linked,
    });
    res.json(postData);
  } catch (e) {
    res.status(500).json("ailed to post details");
  }
});
app.post("/api/objective", async (req, res) => {
  const { objective } = req.body;

  try {
    const postData = await Objective.create({
      objective,
    });
    res.json(postData);
  } catch (e) {
    res.status(500).json("ailed to post details");
  }
});
app.post("/api/experience", async (req, res) => {
  const { companyName, jobTitle, start, end, details } = req.body;

  try {
    const postData = await Experience.create({
      companyName,
      jobTitle,
      start,
      end,
      details,
    });
    res.json(postData);
  } catch (e) {
    res.status(500).json("Failed to post details");
  }
});
app.post("/api/education", async (req, res) => {
  const { course, school, grade, year } = req.body;

  try {
    const postData = await Education.create({
      course,
      school,
      grade,
      year,
    });
    res.json(postData);
  } catch (e) {
    res.status(500).json("Failed to post details");
  }
});
app.listen(port);
