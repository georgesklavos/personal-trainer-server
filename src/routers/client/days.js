const express = require("express");
const router = new express.Router();
const createError = require("http-errors");
const { auth, authRole, authUrl } = require("../../middleware/auth");
const Exercise = require("../../models/exercise");
const Macros = require("../../models/macros");
const ClientInput = require("../../models/clientInput");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const Day = require("../../models/day");
const Values = require("../../models/values");
const User = require("../../models/users");
const Client = require("../../models/client");
const Chart = require("../../models/chart");
const Payment = require("../../models/payment");

router.get(
  "/api/dayClient/exercises/:date",
  auth,
  authRole(3002),
  async (req, res, next) => {
    try {
      const exercises = await Exercise.findOne({
        user: req.user._id,
        date: req.params.date,
      });

      res.send(exercises);
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.get(
  "/api/dayClient/macros/:dayNumber",
  auth,
  authRole(3002),
  async (req, res, next) => {
    try {
      const macros = await Macros.findOne({ user: req.user._id });
      const values = await Values.findOne();

      if (req.user.systemType != macros.macrosTrainer.systemSaved) {
        Object.keys(macros.macrosTrainer).forEach((el) => {
          if (el != "systemSaved") {
            macros.macrosTrainer[el].proteins = Math.round(
              macros.macrosTrainer[el].proteins *
                values.systems[macros.macrosTrainer.systemSaved]
                  .weightLessThanKilo.value
            ).toFixed(2);
            macros.macrosTrainer[el].carbs = Math.round(
              macros.macrosTrainer[el].carbs *
                values.systems[macros.macrosTrainer.systemSaved]
                  .weightLessThanKilo.value
            ).toFixed(2);
            macros.macrosTrainer[el].fats = Math.round(
              macros.macrosTrainer[el].fats *
                values.systems[macros.macrosTrainer.systemSaved]
                  .weightLessThanKilo.value
            ).toFixed(2);
          }
        });
      }

      if (req.user.systemType != macros.macrosClient.systemSaved) {
        Object.keys(macros.macrosClient).forEach((el) => {
          if (el != "systemSaved") {
            macros.macrosClient[el].proteins = Math.round(
              macros.macrosClient[el].proteins *
                values.systems[macros.macrosClient.systemSaved]
                  .weightLessThanKilo.value
            ).toFixed(2);
            macros.macrosClient[el].carbs = Math.round(
              macros.macrosClient[el].carbs *
                values.systems[macros.macrosClient.systemSaved]
                  .weightLessThanKilo.value
            ).toFixed(2);
            macros.macrosClient[el].fats = Math.round(
              macros.macrosClient[el].fats *
                values.systems[macros.macrosClient.systemSaved]
                  .weightLessThanKilo.value
            ).toFixed(2);
          }
        });
      }

      res.send({
        trainer: {
          ...macros.macrosTrainer[req.params.dayNumber],
          systemSaved: macros.macrosTrainer.systemSaved,
        },
        client: {
          ...macros.macrosClient[req.params.dayNumber],
          systemSaved: macros.macrosClient.systemSaved,
        },
      });
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.get(
  "/api/dayClient/clientInput/:date",
  auth,
  authRole(3002),
  async (req, res, next) => {
    try {
      const clientInput = await ClientInput.findOne({
        user: req.user.id,
        date: req.params.date,
      });
      const user = await User.findOne({ _id: req.user._id });
      const values = await Values.findOne();
      if (clientInput) {
        if (user.systemType != clientInput.steps.systemSaved) {
          if (clientInput.steps.distance) {
            clientInput.steps.distance = (
              clientInput.steps.distance *
              values.systems[clientInput.steps.systemSaved].distance.value
            ).toFixed(2);
          }
        }

        if (user.systemType != clientInput.weight.systemSaved) {
          if (clientInput.weight.weight) {
            clientInput.weight.weight = Math.round(
              clientInput.weight.weight *
                values.systems[clientInput.weight.systemSaved].weight.value
            );
          }
          if (clientInput.weight.muscle) {
            clientInput.weight.muscle = Math.round(
              clientInput.weight.muscle *
                values.systems[clientInput.weight.systemSaved].weight.value
            );
          }

          if (clientInput.weight.bone) {
            clientInput.weight.bone = Math.round(
              clientInput.weight.bone *
                values.systems[clientInput.weight.systemSaved].weight.value
            );
          }
        }
      }

      res.send(clientInput);
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.post(
  "/api/dayClient/:date",
  auth,
  authRole(3002),
  async (req, res, next) => {
    try {
      let macros = await Macros.findOne({ user: req.user._id });
      const dayOfWeek = moment(req.params.date).isoWeekday();
      const clientData = await Client.findOne({ user: req.user._id });
      const values = await Values.findOne();

      // if (req.user.systemType != macros.macrosClient.systemSaved) {
      //   macros.macrosClient.systemSaved = req.user.systemType;
      //   Object.keys(macros.macrosClient).forEach((el) => {
      //     if (el != "systemSaved") {
      //       macros.macrosClient[el].proteins = (
      //         macros.macrosClient[el].proteins *
      //         values.systems[macros.macrosClient.systemSaved].weightLessThanKilo
      //           .value
      //       ).toFixed(2);
      //       macros.macrosClient[el].carbs = (
      //         macros.macrosClient[el].carbs *
      //         values.systems[macros.macrosClient.systemSaved].weightLessThanKilo
      //           .value
      //       ).toFixed(2);
      //       macros.macrosClient[el].fats = (
      //         macros.macrosClient[el].fats *
      //         values.systems[macros.macrosClient.systemSaved].weightLessThanKilo
      //           .value
      //       ).toFixed(2);
      //       macros.macrosClient[el].calories = (
      //         macros.macrosClient[el].calories *
      //         values.systems[macros.macrosClient.systemSaved].weightLessThanKilo
      //           .value
      //       ).toFixed(2);
      //     }
      //   });
      // }

      macros.macrosClient[dayOfWeek] = req.body.macros;
      macros.macrosClient.systemSaved = req.user.systemType;
      const day = await Day.findOne({
        user: req.user._id,
        date: req.body.date,
      });

      if (req.body.macros) {
        day.client.macros = true;
      }

      if (req.body.steps) {
        day.client.steps = true;
      }

      if (req.body.weight) {
        day.client.weight = true;

        if (req.body.weight.weight) {
          clientData.lastWeightNumber = req.body.weight.weight;
        }
      }

      if (req.body.comments) {
        day.client.comment = true;
      }

      if (req.body.payment) {
        req.body.payment.client = req.user._id;
        req.body.payment.dateClientPaid = req.params.date;
        req.body.payment.systemSaved = req.user.systemType;
        req.body.payment.verified = false;
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
            {
              $expr: {
                $eq: [
                  { $year: "$dateClientPaid" },
                  parseInt(
                    moment(req.params.date, "YYYY-MM-DD").format("YYYY")
                  ),
                ],
              },
            },
            { client: req.user._id },
          ],
        });
        if (payment) {
          Object.assign(payment, req.body.payment);
        } else {
          payment = new Payment(req.body.payment);
        }
        await payment.save();
        day.client.payment = true;
        delete req.body.payment;
      }

      delete req.body.macros;

      await Macros.findOneAndUpdate({ user: req.user._id }, macros);
      await ClientInput.findOneAndUpdate(
        { user: req.user._id, date: req.body.date },
        req.body,
        {
          upsert: true,
        }
      );

      let charts = await Chart.find({
        $and: [
          {
            $expr: {
              $eq: [
                { $month: "$date" },
                parseInt(moment(req.params.date).month()) + 1,
              ],
            },
          },
          { user: req.user._id },
        ],
      });

      let alreadyExist = false;
      let newChart = {};
      let times = 0;
      charts.forEach(async (el) => {
        let date = moment(el.date).format("YYYY-MM-DD");
        if (moment(date).isSame(req.params.date)) {
          if (req.body.steps) {
            if (req.body.steps.number) {
              el.steps = req.body.steps.number;
            }
          }

          el.protein = macros.macrosClient[dayOfWeek].proteins;
          el.carbs = macros.macrosClient[dayOfWeek].carbs;

          el.fat = macros.macrosClient[dayOfWeek].fats;

          el.weight = clientData.lastWeightNumber;

          el.systemSaved = req.user.systemType;
          await el.save();
          alreadyExist = true;
        }
        ++times;
      });

      if (alreadyExist === false && times == charts.length) {
        let data = {};
        data.user = req.user._id;
        data.date = moment(req.params.date).format("YYYY-MM-DD");
        newChart = new Chart(data);
        if (req.body.steps) {
          if (req.body.steps.number) {
            newChart.steps = req.body.steps.number;
          }
        }

        newChart.protein = macros.macrosClient[dayOfWeek].proteins;

        newChart.carbs = macros.macrosClient[dayOfWeek].carbs;

        newChart.fat = macros.macrosClient[dayOfWeek].fats;

        newChart.weight = clientData.lastWeightNumber;

        newChart.systemSaved = req.user.systemType;
      }
      if (Object.keys(newChart).length > 0) {
        await newChart.save();
      }
      await clientData.save();
      await day.save();

      res.send();
    } catch (error) {
      next(createError(400, error));
    }
  }
);

const upload = multer({
  limits: {
    fileSize: 6000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp4)$/)) {
      cb(createError("Please upload a video"));
    }

    cb(undefined, true);
  },
});

// router.post(
//   "/api/me/avatar",
//   auth,
//   upload.single("avatar"),
//   async (req, res, next) => {
//     try {
//       const buffer = await sharp(req.file.buffer)
//         .resize({ width: 250, height: 250 })
//         .png()
//         .toBuffer();

//       req.user.avatar = buffer;

//       await req.user.save();
//       res.send();
//     } catch (error) {
//       next(createError(400, error));
//     }
//   }
// );

saveVideo = (req, exerciseType) => {
  const dir = path.join(
    __dirname,
    `../../../videos/${req.user._id}/${req.params.year}/${req.params.month}/${req.params.day}/${exerciseType}`
  );

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  console.log(req.file);

  fs.writeFileSync(
    path.join(dir, `${req.params.exerciseId}.mp4`),
    req.file.buffer
  );
};

router.post(
  "/api/dayClient/exercises/video/warmUp/:year/:month/:day/:exerciseId",
  auth,
  upload.single("video"),

  async (req, res) => {
    try {
      saveVideo(req, "warmUp");

      let date = moment(
        `${req.params.year}.${req.params.month}.${req.params.day}`,
        "YYYY-MM-DD"
      );
      date = date.format("YYYY-MM-DD");

      const exercise = await Exercise.findOne({
        user: req.user._id,
        date: date,
      });
      exercise.warmUpExercises.forEach((el) => {
        if (el._id.equals(req.params.exerciseId)) {
          el.hasVideo = true;
        }
      });

      const day = await Day.findOne({ user: req.user._id, date: date });

      day.client.exercise = true;

      day.save();

      await exercise.save();

      res.send();
    } catch (error) {
      console.log(error);
    }
  }
);

router.post(
  "/api/dayClient/exercises/video/workout/:year/:month/:day/:exerciseId",
  auth,
  upload.single("video"),
  async (req, res, next) => {
    try {
      saveVideo(req, "workout");

      let date = moment(
        `${req.params.year}.${req.params.month}.${req.params.day}`,
        "YYYY-MM-DD"
      );
      date = date.format("YYYY-MM-DD");

      const exercise = await Exercise.findOne({
        user: req.user._id,
        date: date,
      });

      exercise.workoutExercises.forEach((el) => {
        if (el._id.equals(req.params.exerciseId)) {
          el.hasVideo = true;
        }
      });

      const day = await Day.findOne({ user: req.user._id, date: date });

      day.client.exercise = true;

      day.save();
      await exercise.save();

      res.send();
    } catch (error) {
      console.log(error);
    }
  }
);

router.post(
  "/api/dayClient/exercises/video/coolUp/:year/:month/:day/:exerciseId",
  auth,
  upload.single("video"),
  async (req, res, next) => {
    try {
      saveVideo(req, "coolUp");

      let date = moment(
        `${req.params.year}.${req.params.month}.${req.params.day}`,
        "YYYY-MM-DD"
      );
      date = date.format("YYYY-MM-DD");

      const exercise = await Exercise.findOne({
        user: req.user._id,
        date: date,
      });

      exercise.coolUpExercises.forEach((el) => {
        if (el._id.equals(req.params.exerciseId)) {
          el.hasVideo = true;
        }
      });

      const day = await Day.findOne({ user: req.user._id, date: date });

      day.client.exercise = true;

      await day.save();
      await exercise.save();

      res.send();
    } catch (error) {
      console.log(error);
    }
  }
);

deleteVideo = (req, exerciseType) => {
  const dir = path.join(
    __dirname,
    `../../../videos/${req.user._id}/${req.params.year}/${req.params.month}/${req.params.day}/${exerciseType}`
  );

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.unlinkSync(path.join(dir, `${req.params.exerciseId}.mp4`), (err) => {
    console.log(err);
  });
};

router.delete(
  "/api/dayClient/exercises/video/warmUp/:year/:month/:day/:exerciseId",
  auth,
  authRole(3002),
  async (req, res, next) => {
    try {
      deleteVideo(req, "warmUp");
      let date = moment(
        `${req.params.year}.${req.params.month}.${req.params.day}`,
        "YYYY-MM-DD"
      );
      date = date.format("YYYY-MM-DD");

      const exercise = await Exercise.findOne({
        user: req.user._id,
        date: date,
      });

      exercise.warmUpExercises.forEach((el) => {
        if (el._id.equals(req.params.exerciseId)) {
          el.hasVideo = false;
        }
      });

      await exercise.save();

      res.send();
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.delete(
  "/api/dayClient/exercises/video/workout/:year/:month/:day/:exerciseId",
  auth,
  authRole(3002),
  async (req, res, next) => {
    try {
      deleteVideo(req, "workout");
      let date = moment(
        `${req.params.year}.${req.params.month}.${req.params.day}`,
        "YYYY-MM-DD"
      );
      date = date.format("YYYY-MM-DD");

      const exercise = await Exercise.findOne({
        user: req.user._id,
        date: date,
      });

      exercise.workoutExercises.forEach((el) => {
        if (el._id.equals(req.params.exerciseId)) {
          el.hasVideo = false;
        }
      });

      await exercise.save();

      res.send();
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.delete(
  "/api/dayClient/exercises/video/coolUp/:year/:month/:day/:exerciseId",
  auth,
  authRole(3002),
  async (req, res, next) => {
    try {
      deleteVideo(req, "coolUp");
      let date = moment(
        `${req.params.year}.${req.params.month}.${req.params.day}`,
        "YYYY-MM-DD"
      );
      date = date.format("YYYY-MM-DD");

      const exercise = await Exercise.findOne({
        user: req.user._id,
        date: date,
      });

      exercise.coolUpExercises.forEach((el) => {
        if (el._id.equals(req.params.exerciseId)) {
          el.hasVideo = false;
        }
      });

      await exercise.save();

      res.send();
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.get(
  "/api/dayClient/exercises/video/warmUp/:year/:month/:day/:exerciseId",
  authUrl,
  function (req, res) {
    const path = `videos/${req.user._id}/${req.params.year}/${req.params.month}/${req.params.day}/warmUp/${req.params.exerciseId}.mp4`;
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
  "/api/dayClient/exercises/video/workout/:year/:month/:day/:exerciseId",
  authUrl,
  function (req, res) {
    const path = `videos/${req.user._id}/${req.params.year}/${req.params.month}/${req.params.day}/workout/${req.params.exerciseId}.mp4`;
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
  "/api/dayClient/exercises/video/coolUp/:year/:month/:day/:exerciseId",
  authUrl,
  function (req, res) {
    const path = `videos/${req.user._id}/${req.params.year}/${req.params.month}/${req.params.day}/coolUp/${req.params.exerciseId}.mp4`;
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
  "/api/client/month/exercises/:month/:year",
  auth,
  authRole(3002),
  async (req, res, next) => {
    try {
      // let days = await Day.find({ user: req.user._id });

      // days = days.filter((el) => {
      //   return (
      //     moment(el.date).month() + 1 == req.params.month &&
      //     moment(el.date).year() == req.params.year
      //   );
      // });
      const client = await Client.findOne({ user: req.user._id });
      let days = [];
      if (client.payment) {
        days = await Day.find({
          $and: [
            {
              $expr: { $eq: [{ $month: "$date" }, parseInt(req.params.month)] },
            },
            {
              $expr: { $eq: [{ $year: "$date" }, parseInt(req.params.year)] },
            },
            { user: req.user._id },
          ],
        });
      }

      res.send(days);
    } catch (error) {
      next(createError(400, error));
    }
  }
);

// router.post(
//   "/api/client/add/day/:date/:type",
//   auth,
//   authRole(3002),
//   async (req, res, next) => {
//     try {
//       const day = await Day.findOne({
//         user: req.user._id,
//         date: req.params.date,
//       });
//       day.client[req.params.type] = true;

//       day.save();

//       res.send();
//     } catch (error) {
//       next(createError(400, error));
//     }
//   }
// );

module.exports = router;
