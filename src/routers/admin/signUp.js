const express = require("express");
const router = new express.Router();
const Types = require("../../models/types");
const Values = require("../../models/values");
const createError = require("http-errors");
const { auth, authRole } = require("../../middleware/auth");
const User = require("../../models/users");
const Admin = require("../../models/admin");
const Client = require("../../models/client");
const Trainer = require("../../models/trainer");
const Macros = require("../../models/macros");

router.post("/api/adminSignUp", async (req, res, next) => {
  req.body.role = 3000;
  const user = new User(req.body);
  let correctSystem = true;
  let correctCurrency = true;

  if (req.body.systemType || req.body.currency) {
    const types = await Types.findOne();

    correctSystem = types.system.some((el) => el.id === req.body.systemType);
    correctCurrency = types.currency.some((el) => el.id === req.body.currency);
  }

  try {
    if (!correctSystem) {
      throw createError(400, "The value systemType is not valid");
    }

    if (!correctCurrency) {
      throw createError(400, "The value currency is not valid");
    }

    await user.save();

    const savedUser = await User.findOne({ email: req.body.email });

    const admin = new Admin({ user: savedUser._id });

    await admin.save();

    res.status(201).send();
  } catch (error) {
    next(createError(400, error));
  }
});

router.post(
  "/api/clientSignUp",
  auth,
  authRole(3000),
  async (req, res, next) => {
    const userBody = {
      email: req.body.email,
      password: req.body.password,
      systemType: req.body.systemType,
      currency: req.body.currency,
      role: 3002,
    };

    delete req.body.email;
    delete req.body.password;
    delete req.body.systemType;
    delete req.body.currency;

    const user = new User(userBody);

    let correctSystem = true;
    let correctCurrency = true;
    let correctPaymentType = true;

    const types = await Types.findOne();

    if (req.body.systemType) {
      correctSystem = types.system.some((el) => el.id === req.body.systemType);
    }

    if (req.body.currency) {
      correctCurrency = types.currency.some(
        (el) => el.id === req.body.currency
      );
    }

    const values = await Values.findOne();

    if (req.body.paymentType) {
      correctPaymentType = values.paymentType.some(
        (el) => el.id === req.body.paymentType
      );
    }

    const correctSex = values.sex.some((el) => el.id === req.body.sex);
    const correctLevel = values.level.some((el) => el.id === req.body.level);
    const correctProgram = values.program.some(
      (el) => el.id === req.body.program
    );
    const correctTarget = values.target.some((el) => el.id === req.body.target);
    const trainer = await Trainer.findOne({ user: req.body.trainer });

    try {
      if (!correctSystem) {
        throw createError(400, "The value systemType is not valid");
      }

      if (!correctCurrency) {
        throw createError(400, "The value currency is not valid");
      }

      if (!correctSex) {
        throw createError(400, "The value sex is not valid");
      }

      if (!correctLevel) {
        throw createError(400, "The value level is not valid");
      }

      if (!correctProgram) {
        throw createError(400, "The value program is not valid");
      }

      if (!correctTarget) {
        throw createError(400, "The value target is not valid");
      }

      if (!correctPaymentType) {
        throw createError(400, "The value paymentType is not valid");
      }
      if (!trainer) {
        throw createError(400, "The value trainer is not valid");
      }

      await user.save();

      const savedUser = await User.findOne({ email: userBody.email });

      req.body.user = savedUser._id;

      const client = new Client(req.body);

      trainer.clients.push({ client: savedUser._id });

      await trainer.save();

      await client.save();

      const macrosBody = { user: savedUser._id };
      const macros = new Macros(macrosBody);

      await macros.save();

      res.status(201).send();
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.post(
  "/api/trainerSignUp",
  auth,
  authRole(3000),
  async (req, res, next) => {
    const userBody = {
      email: req.body.email,
      password: req.body.password,
      systemType: req.body.systemType,
      currency: req.body.currency,
      role: 3001,
    };

    delete req.body.email;
    delete req.body.password;
    delete req.body.systemType;
    delete req.body.currency;

    const user = new User(userBody);

    let correctSystem = true;
    let correctCurrency = true;

    if (req.body.systemType) {
      const types = await Types.findOne();

      correctSystem = types.system.some((el) => el.id === req.body.systemType);
    }

    if (req.body.currency) {
      correctCurrency = types.currency.some(
        (el) => el.id === req.body.currency
      );
    }
    const values = await Values.findOne();
    const correctSex = values.sex.some((el) => el.id === req.body.sex);
    const correctLevel = values.level.some((el) => el.id === req.body.level);

    try {
      if (!correctSystem) {
        throw createError(400, "The value systemType is not valid");
      }

      if (!correctCurrency) {
        throw createError(400, "The value currency is not valid");
      }

      if (!correctSex) {
        throw createError(400, "The value sex is not valid");
      }

      if (!correctLevel) {
        throw createError(400, "The value level is not valid");
      }

      await user.save();

      const savedUser = await User.findOne({ email: userBody.email });

      req.body.user = savedUser._id;

      const trainer = new Trainer(req.body);

      await trainer.save();

      res.status(201).send();
    } catch (error) {
      next(createError(400, error));
    }
  }
);

module.exports = router;
