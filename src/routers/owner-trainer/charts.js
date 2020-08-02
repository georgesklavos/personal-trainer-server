const express = require("express");
const router = new express.Router();
const createError = require("http-errors");
const { auth, authRole, authOwnerTrainer } = require("../../middleware/auth");
const moment = require("moment");
const Chart = require("../../models/chart");
const Trainer = require("../../models/trainer");
const Values = require("../../models/values");

router.get(
  "/api/ChartData/:user/:month/:year",
  auth,
  authOwnerTrainer(3000, 3001),
  async (req, res, next) => {
    try {
      let trainerData = {};
      if (req.user.role == 3001) {
        trainerData = await Trainer.findOne({ user: req.user._id });
        if (!trainerData.clients.find((el) => el.client == req.params.user)) {
          throw createError(400, "This user does not belong in this trainer");
        }
      }
      const values = await Values.findOne();
      const charts = await Chart.find({
        $and: [
          {
            $expr: {
              $eq: [{ $month: "$date" }, parseInt(req.params.month)],
            },
          },
          {
            $expr: {
              $eq: [{ $year: "$date" }, parseInt(req.params.year)],
            },
          },
          { user: req.params.user },
        ],
      }).sort({ date: 1 });

      charts.forEach((el) => {
        if (req.user.systemType != el.systemSaved) {
          if (el != "systemSaved") {
            el.proteins = (
              el.proteins *
              values.systems[el.systemSaved].weightLessThanKilo.value
            ).toFixed(2);
            el.carbs = (
              el.carbs * values.systems[el.systemSaved].weightLessThanKilo.value
            ).toFixed(2);
            el.fat = (
              el.fat * values.systems[el.systemSaved].weightLessThanKilo.value
            ).toFixed(2);
            el.weight = (
              el.weight * values.systems[el.systemSaved].weight.value
            ).toFixed(2);
          }
        }
      });

      res.send(charts);
    } catch (error) {
      next(createError(400, error));
    }
  }
);

module.exports = router;
