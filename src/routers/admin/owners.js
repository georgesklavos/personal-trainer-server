const express = require("express");
const router = new express.Router();
const { auth, authRole } = require("../../middleware/auth");
const createError = require("http-errors");
const User = require("../../models/users");
const _ = require("lodash");
const Values = require("../../models/values");
const Owner = require("../../models/owner");

router.get("/api/getOwners", auth, authRole(3003), async (req, res, next) => {
  try {
    const users = await User.find({ role: 3000 });
    const owners = await Owner.find();
    let finalData = [];

    users.forEach((user) => {
      let data = owners.find((owner) => owner.user.equals(user._id));

      finalData.push(_.merge(data, user));
    });

    res.status(200).send(finalData);
  } catch (error) {
    next(createError(400, error));
  }
});

router.post(
  "/api/ownerSignUp",
  auth,
  authRole(3003),
  async (req, res, next) => {
    const userBody = {
      email: req.body.email,
      password: req.body.password,
      role: 3000,
    };

    delete req.body.email;
    delete req.body.password;

    const user = new User(userBody);
    try {
      await user.save();

      const savedUser = await User.findOne({ email: userBody.email });

      req.body.user = savedUser._id;

      const owner = new Owner(req.body);

      await owner.save();

      res.status(201).send();
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.patch(
  "/api/ownerSignUp",
  auth,
  authRole(3003),
  async (req, res, next) => {
    try {
      delete req.body._id;
      await Owner.findOneAndUpdate({ user: req.body.user }, req.body);
      res.send();
    } catch (error) {
      next(createError(400, error));
    }
  }
);

module.exports = router;
