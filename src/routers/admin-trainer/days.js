const express = require("express");
const router = new express.Router();
const Types = require("../../models/types");
const Values = require("../../models/values");
const createError = require("http-errors");
const {
  auth,
  authRole,
  authAdminTrainer,
  authUrl,
} = require("../../middleware/auth");
const Client = require("../../models/client");
const Exercise = require("../../models/exercise");
const Macros = require("../../models/macros");
const ClientInput = require("../../models/clientInput");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const Day = require("../../models/day");
const User = require("../../models/users");
const { cli } = require("winston/lib/winston/config");

router.post(
  "/api/day",
  auth,
  authAdminTrainer(3000, 3001),
  async (req, res, next) => {
    try {
      const macros = {};
      macros.macrosTrainer = req.body.macros;

      await Macros.findOneAndUpdate({ user: req.body.user }, macros);

      delete req.body.macros;

      await Exercise.findOneAndUpdate(
        { user: req.body.user, date: req.body.date },
        req.body,
        {
          upsert: true,
        }
      );

      const dayExists = await Day.findOne({
        user: req.body.user,
        date: req.body.date,
      });

      if (!dayExists) {
        const day = new Day({ user: req.body.user, date: req.body.date });
        await day.save();
      }

      res.send();
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.get(
  "/api/day/exercises/:user/:date",
  auth,
  authAdminTrainer(3000, 3001),
  async (req, res, next) => {
    try {
      const exercises = await Exercise.findOne({
        user: req.params.user,
        date: req.params.date,
      });

      res.send(exercises);
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.get(
  "/api/day/macros/:user",
  auth,
  authAdminTrainer(3000, 3001),
  async (req, res, next) => {
    try {
      const macros = await Macros.findOne({ user: req.params.user });
      const values = await Values.findOne();

      if (req.user.systemType != macros.macrosTrainer.systemSaved) {
        Object.keys(macros.macrosTrainer).forEach((el) => {
          if (el != "systemSaved") {
            macros.macrosTrainer[el].proteins = (
              macros.macrosTrainer[el].proteins *
              values.systems[macros.macrosTrainer.systemSaved]
                .weightLessThanKilo.value
            ).toFixed(2);
            macros.macrosTrainer[el].carbs = (
              macros.macrosTrainer[el].carbs *
              values.systems[macros.macrosTrainer.systemSaved]
                .weightLessThanKilo.value
            ).toFixed(2);
            macros.macrosTrainer[el].fats = (
              macros.macrosTrainer[el].fats *
              values.systems[macros.macrosTrainer.systemSaved]
                .weightLessThanKilo.value
            ).toFixed(2);
            macros.macrosTrainer[el].calories = (
              macros.macrosTrainer[el].calories *
              values.systems[macros.macrosTrainer.systemSaved]
                .weightLessThanKilo.value
            ).toFixed(2);
          }
        });
      }

      res.send(macros.macrosTrainer);
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.get(
  "/api/day/trainer/userInput/:user/:date",
  auth,
  authAdminTrainer(3000, 3001),
  async (req, res, next) => {
    try {
      const clientInput = await ClientInput.findOne({
        user: req.params.user,
        date: req.params.date,
      });
      const client = await User.findOne({ _id: req.params.user });
      const values = await Values.findOne();

      if (req.user.systemType != client.systemType) {
        clientInput.steps.distance = Math.round(
          clientInput.steps.distance *
            values.systems[client.systemType].distance.value
        );
        clientInput.weight.weight = Math.round(
          clientInput.weight.weight *
            values.systems[client.systemType].weight.value
        );
        clientInput.weight.muscle = Math.round(
          clientInput.weight.muscle *
            values.systems[client.systemType].weight.value
        );
        clientInput.weight.bone = Math.round(
          clientInput.weight.bone *
            values.systems[client.systemType].weight.value
        );
      }

      res.send(clientInput);
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.get(
  "/api/day/trainer/macros/:user/:day",
  auth,
  authAdminTrainer(3000, 3001),
  async (req, res, next) => {
    try {
      const macros = await Macros.findOne({ user: req.params.user });

      res.send({
        trainer: macros.macrosTrainer[req.params.day],
        client: macros.macrosClient[req.params.day],
      });
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.get(
  "/api/trainer/exercises/video/warmUp/:user/:year/:month/:day/:exerciseId",
  authUrl,
  function (req, res) {
    const path = `videos/${req.params.user}/${req.params.year}/${req.params.month}/${req.params.day}/warmUp/${req.params.exerciseId}.mp4`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  }
);

router.get(
  "/api/trainer/exercises/video/workout/:user/:year/:month/:day/:exerciseId",
  authUrl,
  function (req, res) {
    const path = `videos/${req.params.user}/${req.params.year}/${req.params.month}/${req.params.day}/workout/${req.params.exerciseId}.mp4`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  }
);

router.get(
  "/api/trainer/exercises/video/coolUp/:user/:year/:month/:day/:exerciseId",
  authUrl,
  function (req, res) {
    const path = `videos/${req.params.user}/${req.params.year}/${req.params.month}/${req.params.day}/coolUp/${req.params.exerciseId}.mp4`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  }
);

router.get(
  "/api/trainer/month/exercises/:user/:month/:year",
  auth,
  authAdminTrainer(3000, 3001),
  async (req, res, next) => {
    try {
      // let days = await Day.find({ user: req.params.user });

      let days = await Day.find({
        $and: [
          {
            $expr: { $eq: [{ $month: "$date" }, parseInt(req.params.month)] },
          },
          {
            $expr: { $eq: [{ $year: "$date" }, parseInt(req.params.year)] },
          },
          { user: req.params.user },
        ],
      });

      // days = days.filter((el) => {
      //   return (
      //     moment(el.date).month() + 1 == req.params.month &&
      //     moment(el.date).year() == req.params.year
      //   );
      // });

      res.send(days);
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.post(
  "/api/trainer/update/day/:date/:user/:type",
  auth,
  authAdminTrainer(3000, 3001),
  async (req, res, next) => {
    try {
      let day = await Day.findOne({
        user: req.params.user,
        date: req.params.date,
      });

      day.trainer[req.params.type] = true;

      await day.save();
      res.send();
    } catch (error) {
      next(createError(400, error));
    }
  }
);

module.exports = router;
