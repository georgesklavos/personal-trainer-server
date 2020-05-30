const express = require("express");
const router = new express.Router();
const { auth } = require("../../middleware/auth");
const createError = require("http-errors");
const User = require("../../models/users");

router.post("/api/login", async (req, res, next) => {
  try {
    let user = await User.findByCredentials(req.body.email, req.body.password);

    const token = await user.generateAuthToken();
    res.send({ user, token });
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
