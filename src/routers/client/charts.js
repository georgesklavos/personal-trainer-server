const express = require("express");
const router = new express.Router();
const createError = require("http-errors");
const { auth, authRole } = require("../../middleware/auth");
const moment = require("moment");
const Chart = require("../../models/chart");
const Values = require("../../models/values");

router.get(
  "/api/ChartData/:month/:year",
  auth,
  authRole(3002),
  async (req, res, next) => {
    try {
      const values = await Values.findOne();
      let charts = await Chart.find({
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
          { user: req.user._id },
        ],
      }).sort({ date: 1 });
      charts.forEach((el) => {
        if (req.user.systemType != el.systemSaved) {
          el.protein = (
            el.protein * values.systems[el.systemSaved].weightLessThanKilo.value
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
      });

      res.send(charts);
    } catch (error) {
      console.log(error);
      next(createError(400, error));
    }
  }
);

module.exports = router;
