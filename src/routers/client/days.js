const express = require("express");
const router = new express.Router();
const createError = require("http-errors");
const { auth, authRole } = require("../../middleware/auth");
const Exercise = require("../../models/exercise");
const Macros = require("../../models/macros");
const ClientInput = require("../../models/clientInput");

router.get(
  "/api/dayClient/exercises/:date",
  auth,
  authRole(3002),
  async (req, res, next) => {
    try {
      const exercises = await Exercise.findOne({
        user: req.user._id,
        date: req.params.date,
      });

      res.send(exercises);
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.get(
  "/api/dayClient/macros/:dayNumber",
  auth,
  authRole(3002),
  async (req, res, next) => {
    try {
      const macros = await Macros.findOne({ user: req.user._id });

      res.send({
        trainer: macros.macrosTrainer[req.params.dayNumber],
        client: macros.macrosClient[req.params.dayNumber],
      });
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.post("/api/dayClient", auth, authRole(3002), async (req, res, next) => {
  try {
    const macros = {};
    macros.macrosClient = req.body.macros;

    delete req.body.macros;

    await Macros.findByIdAndUpdate({ user: req.user._id }, macros);

    await ClientInput.findOneAndUpdate(
      { user: req.body.user, date: req.body.date },
      req.body,
      {
        upsert: true,
      }
    );
  } catch (error) {
    next(createError(400, error));
  }
});

module.exports = router;
