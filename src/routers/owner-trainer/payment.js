const express = require("express");
const router = new express.Router();
const createError = require("http-errors");
const { auth, authRole, authOwnerTrainer } = require("../../middleware/auth");
const moment = require("moment");
const Chart = require("../../models/chart");
const Trainer = require("../../models/trainer");
const Values = require("../../models/values");
const Payment = require("../../models/payment");
const Client = require("../../models/client");
const { toLower } = require("lodash");

router.get(
  "/api/verifyPayment/:user/:month/:year",
  auth,
  authOwnerTrainer(3000, 3001),
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
          { client: req.params.user },
          // { verified: true },
        ],
      });

      res.send(payment);
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.post(
  "/api/verifyPayment/:user/:date",
  auth,
  authOwnerTrainer(3000, 3001),
  async (req, res, next) => {
    try {
      // const payment = new Payment({
      //   userVerified: req.user._id,
      //   client: req.params.user,
      //   date: moment(req.params.date).format("YYYY-MM-DD"),
      // });

      const data = {
        userVerified: req.user._id,
        dateVerified: moment(req.params.date).format("YYYY-MM-DD"),
        verified: true,
      };

      let payment = await Payment.findOne({
        $and: [
          {
            $expr: {
              $eq: [
                { $month: "$dateClientPaid" },
                parseInt(moment(req.params.date, "YYYY-MM-DD").format("M")),
              ],
            },
          },
          { client: req.params.user },
        ],
      });

      payment = Object.assign(payment, data);

      let client = await Client.findOne({ user: req.params.user });
      const values = await Values.findOne();

      client.endDate = moment(client.endDate).add(
        1,
        toLower(
          values.program[
            Object.keys(values.program).find(
              (el) => values.program[el].id == client.program
            )
          ].name.en
        )
      );

      await payment.save();
      await client.save();

      res.send();
    } catch (error) {
      next(createError(400, error));
    }
  }
);

module.exports = router;
