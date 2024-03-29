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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
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
      ref: "Trainer",
    },
    viewedByTrainer: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

clientSchema.methods.toJSON = function () {
  const user = this;

  const clientObject = user.toObject();

  delete clientObject.password;

  return clientObject;
};

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
