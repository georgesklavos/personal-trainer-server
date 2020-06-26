const express = require("express");
const router = new express.Router();
const Types = require("../../models/types");
const Values = require("../../models/values");
const createError = require("http-errors");
const { auth, authRole } = require("../../middleware/auth");
const User = require("../../models/users");
const Admin = require("../../models/admin");
const Client = require("../../models/client");
const Trainer = require("../../models/trainer");
const Macros = require("../../models/macros");
const Language = require("../../models/lang");

router.post("/api/language", auth, authRole(3000), async (req, res, next) => {
  try {
    await Language.findOneAndUpdate({}, req.body, {
      upsert: true,
    });
    res.send();
  } catch (error) {
    next(createError(400, error));
  }
});

module.exports = router;
