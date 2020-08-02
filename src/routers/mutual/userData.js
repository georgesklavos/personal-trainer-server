const express = require("express");
const router = new express.Router();
const { auth } = require("../../middleware/auth");
const createError = require("http-errors");
const Trainer = require("../../models/trainer");
const Client = require("../../models/client");
const Values = require("../../models/values");
const User = require("../../models/users");
const Owner = require("../../models/owner");

router.get("/api/roleInfo", auth, async (req, res, next) => {
  try {
    let userData = {};
    if (req.user.role == 3000) {
      userData = await Owner.findOne({ user: req.user._id });
    } else if (req.user.role == 3001) {
      userData = await Trainer.findOne({ user: req.user._id });
    } else if (req.user.role == 3002) {
      userData = await Client.findOne({ user: req.user._id });
      const values = await Values.findOne();
      let trainer = await Trainer.findOne({ user: userData.trainer });
      trainer = trainer.toObject();
      userData = userData.toObject();
      userData.trainerPrice = trainer.paymentNumber;
      let trainerData = await User.findOne({ _id: userData.trainer });

      if (req.user.currency != trainerData.currency) {
        userData.trainerPrice = (
          userData.trainerPrice * values.currency[trainerData.currency].value
        ).toFixed(2);
      }
    }

    res.send(userData);
  } catch (error) {
    next(createError(400, error));
  }
});

module.exports = router;
