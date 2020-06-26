const express = require("express");
const router = new express.Router();
const createError = require("http-errors");
const { auth, authAdminTrainer } = require("../../middleware/auth");
const HowYouFeel = require("../../models/howYouFeel");
const moment = require("moment");
const Trainer = require("../../models/trainer");

router.get(
  "/api/howYouFeel/:month/:year/:user",
  auth,
  authAdminTrainer(3000, 3001),
  async (req, res, next) => {
    let final = [];
    const date = moment(
      `${req.params.year}-${req.params.month}-01`,
      "YYYY-MM-DD"
    ).format("YYYY-MM-DD");

    try {
      let trainerData = {};
      if (req.user.role == 3001) {
        trainerData = await Trainer.findOne({ user: req.user._id });
        if (!trainerData.clients.find((el) => el.client == req.params.user)) {
          throw createError(400, "This user does not belong in this trainer");
        }
      }

      const howYouFeel = await HowYouFeel.find({ user: req.params.user });
      howYouFeel.forEach((el) => {
        if (moment(el.date, "YYYY-MM-DD").isSame(date, "month")) {
          final.push(el);
        }
      });
      res.send(final);
    } catch (error) {
      next(createError(400, error));
    }
  }
);

module.exports = router;
