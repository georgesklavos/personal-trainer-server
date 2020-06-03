const mongoose = require("mongoose");

const valuesSchema = new mongoose.Schema({
  systems: {
    1000: {
      weight: {
        name: String,
        symbol: String,
        value: Number,
      },
      height: {
        name: String,
        symbol: String,
        value: Number,
      },
      distance: {
        name: String,
        symbol: String,
        value: Number,
      },
    },
    1001: {
      weight: {
        name: String,
        symbol: String,
        value: Number,
      },
      height: {
        name: String,
        symbol: String,
        value: Number,
      },
      distance: {
        name: String,
        symbol: String,
        value: Number,
      },
    },
  },
  currency: {
    "2000": {
      name: String,
      symbol: String,
      value: Number,
    },
    "2001": {
      name: String,
      symbol: String,
      value: Number,
    },
  },
  program: [
    {
      id: Number,
      name: String,
      _id: false,
    },
  ],
  sex: [
    {
      id: Number,
      name: String,
      _id: false,
    },
  ],

  level: [
    {
      id: Number,
      name: String,
      _id: false,
    },
  ],
  target: [
    {
      id: Number,
      name: String,
      _id: false,
    },
  ],
  paymentType: [
    {
      id: Number,
      name: String,
      _id: false,
    },
  ],
  exerciseMode: [
    {
      id: Number,
      name: String,
      _id: false,
    },
  ],
  exerciseOptions: [
    {
      id: Number,
      name: String,
      _id: false,
    },
  ],
  warmUpExercises: [
    {
      id: Number,
      name: String,
      _id: false,
    },
  ],
  workoutExercises: [
    {
      id: Number,
      name: String,
      _id: false,
    },
  ],
  coolUpExercises: [
    {
      id: Number,
      name: String,
      _id: false,
    },
  ],
  stepsDistance: [
    {
      id: Number,
      name: String,
      _id: false,
    },
  ],
});

const Values = mongoose.model("Values", valuesSchema);

module.exports = Values;
