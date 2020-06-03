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
        name: Number,
        value: Number,
        option: Number,
      },
    ],
    workoutExercises: [
      {
        name: Number,
        value: Number,
        option: Number,
      },
    ],
    coolUpExercises: [
      {
        name: Number,
        value: Number,
        option: Number,
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
