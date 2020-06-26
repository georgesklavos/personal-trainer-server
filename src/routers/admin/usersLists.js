const express = require("express");
const router = new express.Router();
// const { Client, Trainer } = require("../../models/user");
const { auth, authRole } = require("../../middleware/auth");
const createError = require("http-errors");
// const Common = Client;
const User = require("../../models/users");
const Trainer = require("../../models/trainer");
const Client = require("../../models/client");
const _ = require("lodash");
const Values = require("../../models/values");
const { cli } = require("winston/lib/winston/config");

router.get("/api/getTrainers", auth, authRole(3000), async (req, res, next) => {
  try {
    const users = await User.find({ role: 3001 });
    const trainers = await Trainer.find();
    const values = await Values.findOne();
    let finalData = [];

    users.forEach((user) => {
      let data = trainers.find((trainer) => trainer.user.equals(user._id));
      // console.log(data);

      if (req.user.currency != user.currency) {
        data.paymentNumber = Number.parseFloat(
          data.paymentNumber * values.currency[user.currency].value
        ).toFixed(2);
      }

      finalData.push(_.merge(data, user));
    });

    res.status(200).send(finalData);
  } catch (error) {
    next(createError(400, error));
  }
});

router.get("/api/getClients", auth, authRole(3000), async (req, res, next) => {
  try {
    const users = await User.find({ role: 3002 });
    const clients = await Client.find();
    const values = await Values.findOne();
    let finalData = [];
    if (users.length > 0) {
      users.forEach(async (user, index) => {
        let data = clients.find((client) => client.user.equals(user._id));
        let trainerForClient = await Trainer.findOne({ user: data.trainer });
        if (req.user.systemType != user.systemType) {
          data.lastWeightNumber = Math.round(
            data.lastWeightNumber * values.systems[user.systemType].weight.value
          );
          data.heightNumber = Math.round(
            data.heightNumber * values.systems[user.systemType].height.value
          );
        }
        finalData.push(_.merge(data, user));
        // finalData.push(_.assign(user, data));

        _.set(
          finalData[index],
          "_doc.paymentNumber",
          trainerForClient.paymentNumber
        );
        if (finalData.length == clients.length) {
          res.status(200).send(finalData);
        }
      });
    } else {
      res.send(users);
    }
  } catch (error) {
    next(createError(400, error));
  }
});

module.exports = router;
