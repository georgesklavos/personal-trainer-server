const express = require("express");
const router = new express.Router();
const { auth } = require("../../middleware/auth");
const createError = require("http-errors");
const User = require("../../models/users");
const Trainer = require("../../models/trainer");
const Client = require("../../models/client");
const Owner = require("../../models/owner");

router.post("/api/login", async (req, res, next) => {
  try {
    let user = await User.findByCredentials(req.body.email, req.body.password);

    let allowed = true;
    if (user.role == 3000) {
      let data = await Owner.findOne({ user: user._id });
      if (!data.active) {
        allowed = false;
      }
    } else if (user.role == 3001) {
      let data = await Trainer.findOne({ user: user._id });
      let dataOwner = await Owner.findOne({ user: data.owner });

      if (!(dataOwner.active && data.active)) {
        allowed = false;
      }
    } else if (user.role == 3002) {
      let data = await Client.findOne({ user: user._id });
      let dataOwner = await Owner.findOne({ user: data.owner });
      if (!(dataOwner.active && data.active)) {
        allowed = false;
      }
    }
    if (allowed) {
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } else {
      res.send();
    }
  } catch (error) {
    next(createError(400, error));
  }
});

router.get("/api/me", auth, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(createError(400, error));
  }
});

module.exports = router;
