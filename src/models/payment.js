const mongoose = require("mongoose");

let PaymentSchema = new mongoose.Schema({
  userVerified: {
    type: mongoose.Schema.Types.ObjectId,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  dateClientPaid: {
    type: Date,
    required: true,
  },
  dateVerified: {
    type: Date,
  },
  ammount: {
    type: Number,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  verified: {
    type: Boolean,
  },
  systemSaved: {
    type: Number,
    required: true,
  },
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
