const express = require("express");
const router = new express.Router();
const { auth } = require("../../middleware/auth");
const createError = require("http-errors");

router.post("/api/logout", auth, async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    // res.status(500).json({ error: error.toString() });
    next(createError(500, error));
  }
});

router.post("/api/logoutAll", auth, async (req, res, next) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    // res.status(500).json({ error: error.toString() });
    next(createError(500, error));
  }
});

module.exports = router;
