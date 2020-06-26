const express = require("express");
const router = new express.Router();
const Language = require("../../models/lang");
const createError = require("http-errors");
const { auth, authRole } = require("../../middleware/auth");

router.get("/api/language", auth, async (req, res, next) => {
  try {
    const translations = await Language.findOne();
    res.send(translations);
  } catch (error) {
    next(createError(400, error));
  }
});

module.exports = router;
