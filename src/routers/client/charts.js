const express = require("express");
const router = new express.Router();
const createError = require("http-errors");
const { auth, authRole } = require("../../middleware/auth");
const moment = require("moment");
const Chart = require("../../models/chart");

router.get(
  "/api/weeklyChartData/steps/:date",
  auth,
  authRole(3002),
  async (req, res, next) => {
    try {
      const charts = await Chart.find({
        $and: [
          {
            $expr: {
              $eq: [
                { $month: "$date" },
                parseInt(moment(req.params.date).month()) + 1,
              ],
            },
          },
          {
            $expr: {
              $eq: [{ $year: "$date" }, moment(req.params.date).get("year")],
            },
          },
          { user: req.user._id },
        ],
      }).sort({ date: 1 });

      res.send(charts);
    } catch (error) {
      next(createError(400, error));
    }
  }
);

module.exports = router;
