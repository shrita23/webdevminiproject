// @/models.js
const mongoose = require("mongoose");

const SampleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timings: {
    type: String,
    required: false,
  },
}, { collection: 'sample' });

const Sample = mongoose.model("Sample", SampleSchema);

module.exports = { Sample };