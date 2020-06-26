const mongoose = require("mongoose");

var howYouFeelSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

howYouFeelSchema.methods.toJSON = function () {
  const howYouFeel = this;

  const howYouFeelObject = howYouFeel.toObject();

  delete howYouFeelObject._id;
  delete howYouFeelObject.__v;
  delete howYouFeelObject.updatedAt;

  return howYouFeelObject;
};

const HowYouFeel = mongoose.model("HowYouFeel", howYouFeelSchema);

module.exports = HowYouFeel;
