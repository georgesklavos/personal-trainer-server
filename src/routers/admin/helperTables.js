const express = require("express");
const router = new express.Router();
const Types = require("../../models/types");
const Values = require("../../models/values");
const { auth, authRole } = require("../../middleware/auth");

router.post(
  "/api/uploadTypes",
  auth,
  authRole(3003),
  async (req, res, next) => {
    try {
      await Types.findOneAndUpdate({}, req.body, {
        upsert: true,
      });
      res.status(200).send();
    } catch (error) {
      next(createError(500, error));
    }
  }
);

router.post(
  "/api/uploadValues",
  auth,
  authRole(3003),
  async (req, res, next) => {
    try {
      await Values.findOneAndUpdate({}, req.body, {
        upsert: true,
      });
      res.status(200).send();
    } catch (error) {
      next(createError(500, error));
    }
  }
);

module.exports = router;
