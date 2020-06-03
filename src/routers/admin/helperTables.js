const express = require("express");
const router = new express.Router();
const Types = require("../../models/types");
const Values = require("../../models/values");
const { auth, authRole } = require("../../middleware/auth");

router.post(
  "/api/uploadTypes",

  async (req, res, next) => {
    try {
      const types = new Types(req.body);

      await types.save();
      res.status(200).send();
    } catch (error) {
      next(createError(500, error));
    }
  }
);

router.post(
  "/api/uploadValues",

  async (req, res, next) => {
    try {
      const values = new Values(req.body);

      await Values.deleteOne({});

      await values.save();
      res.status(200).send();
    } catch (error) {
      next(createError(500, error));
    }
  }
);

module.exports = router;
