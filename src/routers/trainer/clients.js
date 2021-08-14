const express = require("express");
const router = new express.Router();
const createError = require("http-errors");
const { auth, authRole } = require("../../middleware/auth");
const Trainer = require("../../models/trainer");
const Client = require("../../models/client");
const User = require("../../models/users");
const Values = require("../../models/values");

router.get(
  "/api/trainer/getClients",
  auth,
  authRole(3001),
  async (req, res, next) => {
    const deleteFields = (data) => {
      delete data.systemType;
      delete data.currency;
      delete data.password;
      delete data.tokens;
      delete data.__v;
      delete data.createdAt;
      delete data.updatedAt;
      delete data.email;
      delete data.role;
      delete data.firstName;
      delete data.lastName;
      delete data.payment;
      delete data.active;
      delete data.trainer;

      return data;
    };

    try {
      let trainer = await Trainer.findOne({ user: req.user._id });
      // const values = await Values.findOne();  //Future implemetation change the metric system

      /**Not in use for now */

      // if (trainer.clients.length > 0) {
      //   let clients = [];
      //   trainer.clients.forEach(async (user) => {
      //     let client = await Client.findOne({ user: user.client });
      //     let userData = await User.findOne({ _id: user.client });

      //     client = client.toObject();
      //     client = deleteFields(client);

      //     if (req.user.systemType != userData.systemType) {
      //       client.lastWeightNumber = Math.round(
      //         client.lastWeightNumber *
      //           values.systems[userData.systemType].weight.value
      //       );
      //       client.heightNumber = Math.round(
      //         client.heightNumber *
      //           values.systems[userData.systemType].height.value
      //       );
      //     }

      //     clients.push(client);

      //     if (trainer.clients.length === clients.length) {
      //       clients.sort();
      //       res.send(clients);
      //     }
      //   });
      // } else {
      //   res.send(trainer.clients);
      // }
      await trainer
        .populate({
          path: "clients",
        })
        .execPopulate();
      res.send(trainer.clients);
    } catch (error) {
      next(createError(400, error));
    }
  }
);

module.exports = router;
