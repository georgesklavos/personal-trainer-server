const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    sex: {
      type: Number,
      required: true,
      trim: true,
    },
    level: {
      type: Number,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    payment: {
      type: Boolean,
      required: true,
    },
    program: {
      type: Number,
      required: true,
      trim: true,
    },
    paymentType: {
      type: Number,
      required: true,
      default: 8001,
    },
    lastWeightNumber: {
      type: Number,
      required: true,
    },
    heightNumber: {
      type: Number,
      required: true,
    },
    target: {
      type: Number,
      required: true,
      trim: true,
    },
    startWeek: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
