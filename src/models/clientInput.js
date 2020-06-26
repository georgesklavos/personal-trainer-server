const mongoose = require("mongoose");

const clientInputSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
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
    systemSaved: {
      type: Number,
      required: true,
    },
  },
  weight: {
    weight: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
    muscle: {
      type: Number,
      required: true,
    },
    bone: {
      type: Number,
      required: true,
    },
    bmi: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    systemSaved: {
      type: Number,
      required: true,
    },
  },

  comments: {
    type: String,
    required: true,
  },
});

clientInputSchema.methods.toJSON = function () {
  const user = this;

  const clientInputObject = user.toObject();

  delete clientInputObject.user;
  delete clientInputObject.__v;
  delete clientInputObject._id;

  return clientInputObject;
};

const ClientInput = mongoose.model("clientInput", clientInputSchema);

module.exports = ClientInput;
