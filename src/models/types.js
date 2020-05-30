const mongoose = require("mongoose");

const typesSchema = new mongoose.Schema({
  system: [
    {
      id: Number,
      name: String,
      _id: false,
    },
  ],
  currency: [
    {
      id: Number,
      name: String,
      _id: false,
    },
  ],
  roles: [
    {
      id: Number,
      name: String,
      _id: false,
    },
  ],
});

const Types = mongoose.model("Types", typesSchema);

module.exports = Types;
