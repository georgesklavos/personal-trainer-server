const express = require("express");
const router = new express.Router();
const { auth } = require("../../middleware/auth");
const createError = require("http-errors");
const multer = require("multer");
const sharp = require("sharp");
const _ = require("lodash");
const Trainer = require("../../models/trainer");

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(createError("Please upload an image"));
    }

    cb(undefined, true);
  },
});

router.patch("/api/me", auth, async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["systemType", "currency", "canVerifyPayment"];
  const updatesTrainer = ["canVerifyPayment"];
  const isValidOperations = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  const updatesForTrainer = updatesTrainer.every((update) =>
    updates.includes(update)
  );

  let trainer = {};

  if (updatesForTrainer === true) {
    trainer = await Trainer.findOne({ user: req.user._id });
  }

  if (!isValidOperations) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    updates.forEach((update) => {
      if (updatesForTrainer === true && updatesTrainer.includes(update)) {
        trainer[update] = req.body[update];
      } else {
        req.user[update] = req.body[update];
      }
    });
    await req.user.save();
    if (Object.keys(trainer) > 0) {
      await trainer.save();
    }

    res.send();
  } catch (error) {
    // res.status(400).json({ error: error.toString() });
    next(createError(400, error));
  }
});

router.post(
  "/api/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();

      req.user.avatar = buffer;

      await req.user.save();
      res.send();
    } catch (error) {
      next(createError(400, error));
    }
  }
);

module.exports = router;
