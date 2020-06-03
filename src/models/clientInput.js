const mongoose = require("mongoose");

const clientInputSchema = new mongoose.Schema({
  steps: {
    number: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    period: {
      type: Number,
      required: true,
    },
  },
  weight: {
    fat: {
      type: Number,
      required: true,
    },
    muscle: {
      type: Number,
      required: true,
    },
    Bone: {
      type: Number,
      required: true,
    },
    notes: {
      type: Number,
      required: true,
    },
  },
  comments: {
    type: String,
    required: true,
  },
});

const clientInput = mongoose.model("clientInput", clientInputSchema);

module.exports = clientInput;
