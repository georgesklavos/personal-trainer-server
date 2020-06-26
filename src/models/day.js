const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  client: {
    exercise: {
      type: Boolean,
      required: true,
      default: false,
    },
    macros: {
      type: Boolean,
      required: true,
      default: false,
    },
    steps: {
      type: Boolean,
      default: false,
    },
    weight: {
      type: Boolean,
      default: false,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    comment: {
      type: Boolean,
      default: false,
    },
  },
  trainer: {
    exercise: {
      type: Boolean,
      required: true,
      default: false,
    },
    macros: {
      type: Boolean,
      required: true,
      default: false,
    },
    steps: {
      type: Boolean,
      default: false,
    },
    weight: {
      type: Boolean,
      default: false,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    comment: {
      type: Boolean,
      default: false,
    },
  },
});

daySchema.methods.toJSON = function () {
  const day = this;

  const dayObject = day.toObject();

  delete dayObject.__v;
  delete dayObject._id;

  return dayObject;
};

const Day = mongoose.model("Day", daySchema);

module.exports = Day;
