const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema(
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
    },
    level: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    verifyPayments: {
      type: Boolean,
      required: true,
    },
    paymentNumber: {
      type: Number,
      required: true,
    },
    clients: [
      {
        client: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    notes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

trainerSchema.methods.toJSON = function () {
  const user = this;

  const trainerObject = user.toObject();

  delete trainerObject.__v;
  delete trainerObject.createdAt;
  delete trainerObject.updatedAt;
  delete trainerObject.clients;
  delete trainerObject.notes;
  delete trainerObject.paymentNumber;
  delete trainerObject.age;
  delete trainerObject.sex;
  delete trainerObject.level;
  delete trainerObject.active;
  delete trainerObject.user;
  delete trainerObject._id;

  return trainerObject;
};

const Trainer = mongoose.model("Trainer", trainerSchema);

module.exports = Trainer;
