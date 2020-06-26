const mongoose = require("mongoose");

let chartSchema = new mongoose.Schema({
  steps: {
    type: Number,
    default: 0,
  },
  protein: {
    type: Number,
    default: 0,
  },
  carbs: {
    type: Number,
    default: 0,
  },
  fat: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Chart = mongoose.model("Chart", chartSchema);

module.exports = Chart;
