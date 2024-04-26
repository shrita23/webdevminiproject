const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const { Sample } = require("./models");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  return res.json({ message: "Hello, World ✌️" });
});

app.get("/samples", async (req, res) => {
  const allSamples = await Sample.find();
  return res.status(200).json(allSamples);
});

app.get("/samples/:id", async (req, res) => {
  const { id } = req.params;
  const sample = await Sample.findById(id);
  return res.status(200).json(sample);
});

app.get("/search", async (req, res) => {
  try {
    const searchKeyword = req.query.query; // Get the search keyword from the query parameter "query"

    if (!searchKeyword) {
      return res.status(400).json({ error: "Search keyword is required" });
    }

    // Perform search based on the search keyword
    const searchResults = await Sample.find({
      $or: [
        { name: { $regex: searchKeyword, $options: "i" } }, // Case-insensitive search on the "name" field
        { description: { $regex: searchKeyword, $options: "i" } }, // Case-insensitive search on the "description" field
        // Add more fields as needed for searching
      ],
    });

    return res.status(200).json(searchResults);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://singhshriya131:vellore1@cluster0.sayyrel.mongodb.net/velloremern"
    );
    app.listen(4000, () => console.log("Server started on port 4000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
