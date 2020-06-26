const express = require("express");
const router = new express.Router();
const createError = require("http-errors");
const { auth, authRole } = require("../../middleware/auth");
const Exercise = require("../../models/exercise");
const Macros = require("../../models/macros");
const ClientInput = require("../../models/clientInput");

// router.get(
//   "/api/day/trainer/userInput/:user/:date",
//   auth,
//   authRole(3001),
//   async (req, res, next) => {
//     try {
//       const clientInput = await ClientInput.findOne({
//         user: req.params.user,
//         date: req.params.date,
//       });

//       res.send(clientInput);
//     } catch (error) {
//       next(createError(400, error));
//     }
//   }
// );

// router.get(
//   "/api/day/trainer/macros/:user/:day",
//   auth,
//   authRole(3001),
//   async (req, res, next) => {
//     try {
//       const macros = await Macros.findOne({ user: req.params.user });

//       res.send({
//         trainer: macros.macrosTrainer[req.params.day],
//         client: macros.macrosClient[req.params.day],
//       });
//     } catch (error) {
//       next(createError(400, error));
//     }
//   }
// );

module.exports = router;
