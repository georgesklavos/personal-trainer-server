const express = require("express");
const router = new express.Router();
const createError = require("http-errors");
const { auth, authRole, authOwnerTrainer } = require("../../middleware/auth");
const Client = require("../../models/client");

router.post(
  "/api/trainerViewed/:user",
  auth,
  authOwnerTrainer(3000, 3001),
  async (req, res, next) => {
    try {
      let client = await Client.findOne({ user: req.params.user });

      client.viewedByTrainer = true;

      await client.save();

      res.send();
    } catch (error) {
      next(createError(500, error));
    }
  }
);

module.exports = router;
