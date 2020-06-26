const express = require("express");
const router = new express.Router();
const createError = require("http-errors");
const { auth, authRole, authUrl } = require("../../middleware/auth");
const HowYouFeel = require("../../models/howYouFeel");
const moment = require("moment");

router.post(
  "/api/rate/:rate/:date",
  auth,
  authRole(3002),
  async (req, res, next) => {
    try {
      const howYouFeel = new HowYouFeel({
        user: req.user._id,
        rate: req.params.rate,
        date: req.params.date,
      });
      await howYouFeel.save();
      res.send();
    } catch (error) {
      next(createError(400, error));
    }
  }
);

router.get("/api/rate/:date", auth, authRole(3002), async (req, res, next) => {
  try {
    const howYouFeel = await HowYouFeel.find({ user: req.user._id });

    const final = howYouFeel.find((el) => {
      return moment(el.date).isSame(req.params.date, "week");
    });

    res.send(final);
  } catch (error) {
    next(createError(400, error));
  }
});

module.exports = router;
