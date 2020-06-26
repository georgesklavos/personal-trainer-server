const mongoose = require("mongoose");

const exerciseShema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    exerciseMode: {
      type: Number,
      required: true,
    },
    warmUpExercises: [
      {
        name: {
          type: Number,
          required: true,
        },
        value: {
          type: Number,
          required: true,
        },
        option: {
          type: Number,
          required: true,
        },
        hasVideo: {
          type: Boolean,
          default: false,
        },
      },
    ],
    workoutExercises: [
      {
        name: {
          type: Number,
          required: true,
        },
        value: {
          type: Number,
          required: true,
        },
        option: {
          type: Number,
          required: true,
        },
        hasVideo: {
          type: Boolean,
          default: false,
        },
      },
    ],
    coolUpExercises: [
      {
        name: {
          type: Number,
          required: true,
        },
        value: {
          type: Number,
          required: true,
        },
        option: {
          type: Number,
          required: true,
        },
        hasVideo: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

exerciseShema.methods.toJSON = function () {
  const user = this;

  const exerciseObject = user.toObject();

  delete exerciseObject.user;
  delete exerciseObject.__v;
  delete exerciseObject.createdAt;
  delete exerciseObject.updatedAt;
  delete exerciseObject._id;

  return exerciseObject;
};

const Exercise = mongoose.model("Exercise", exerciseShema);

module.exports = Exercise;
