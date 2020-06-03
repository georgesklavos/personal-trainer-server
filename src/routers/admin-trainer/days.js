const express = require("express");
const router = new express.Router();
const Types = require("../../models/types");
const Values = require("../../models/values");
const createError = require("http-errors");
const { auth, authRole, authAdminTrainer } = require("../../middleware/auth");
const Client = require("../../models/client");
const Exercise = require("../../models/exercise");
const Macros = require("../../models/macros");

router.post(
  "/api/day",
  auth,
  authAdminTrainer(3000, 3001),
  async (req, res, next) => {
    try {
      const macros = {};
      macros.macrosTrainer = req.body.macros;

      await Macros.findOneAndUpdate({ user: req.body.user }, macros);

      delete req.body.macros;

      await Exercise.findOneAndUpdate(
        { user: req.body.user, date: req.body.date },
        req.body,
        {
          upsert: true,
        }
      );

      res.send();
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.get(
  "/api/day/exercises/:user/:date",
  auth,
  authAdminTrainer(3000, 3001),
  async (req, res, next) => {
    try {
      const exercises = await Exercise.findOne({
        user: req.params.user,
        date: req.params.date,
      });

      res.send(exercises);
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.get(
  "/api/day/macros/:user",
  auth,
  authAdminTrainer(3000, 3001),
  async (req, res, next) => {
    try {
      const macros = await Macros.findOne({ user: req.params.user });

      res.send(macros.macrosTrainer);
    } catch (error) {
      next(createError(400, error));
    }
  }
);

module.exports = router;
