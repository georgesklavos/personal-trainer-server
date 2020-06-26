const express = require("express");
const router = new express.Router();
const createError = require("http-errors");
const { auth, authRole, authAdminTrainer } = require("../../middleware/auth");
const moment = require("moment");
const Chart = require("../../models/chart");
const Trainer = require("../../models/trainer");

router.get(
  "/api/weeklyChartData/steps/:user/:date",
  auth,
  authAdminTrainer(3000, 3001),
  async (req, res, next) => {
    try {
      let trainerData = {};
      if (req.user.role == 3001) {
        trainerData = await Trainer.findOne({ user: req.user._id });
        if (!trainerData.clients.find((el) => el.client == req.params.user)) {
          throw createError(400, "This user does not belong in this trainer");
        }
      }

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
          { user: req.params.user },
        ],
      }).sort({ date: 1 });

      res.send(charts);
    } catch (error) {
      next(createError(400, error));
    }
  }
);

module.exports = router;
