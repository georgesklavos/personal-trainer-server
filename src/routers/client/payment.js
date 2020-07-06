const express = require("express");
const router = new express.Router();
const createError = require("http-errors");
const { auth, authRole, authAdminTrainer } = require("../../middleware/auth");
const moment = require("moment");
const Chart = require("../../models/chart");
const Trainer = require("../../models/trainer");
const Values = require("../../models/values");
const Payment = require("../../models/payment");

router.get(
  "/api/payment/:month/:year",
  auth,
  authRole(3002),
  async (req, res, next) => {
    try {
      const payment = await Payment.findOne({
        $and: [
          {
            $expr: {
              $eq: [{ $month: "$dateClientPaid" }, parseInt(req.params.month)],
            },
          },
          {
            $expr: {
              $eq: [{ $year: "$dateClientPaid" }, parseInt(req.params.year)],
            },
          },
          { client: req.user._id },
        ],
      });

      res.send(payment);
    } catch (error) {
      next(createError(400, error));
    }
  }
);

module.exports = router;
