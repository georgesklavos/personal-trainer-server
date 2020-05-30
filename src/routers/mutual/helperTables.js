const express = require("express");
const router = new express.Router();
const Types = require("../../models/types");
const Values = require("../../models/values");
const { auth } = require("../../middleware/auth");
const createError = require("http-errors");

router.get("/api/types", auth, async (req, res, next) => {
  try {
    const types = await Types.findOne();
    res.send(types);
  } catch (error) {
    next(createError(400, error));
  }
});

router.get("/api/values", auth, async (req, res, next) => {
  try {
    const values = await Values.findOne();
    res.send(values);
  } catch (error) {
    next(createError(400, error));
  }
});

module.exports = router;
