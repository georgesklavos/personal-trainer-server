const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    required: true,
  },
  clients: {
    type: Number,
    required: true,
  },
  trainers: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});

const Owner = mongoose.model("Owner", ownerSchema);
module.exports = Owner;
