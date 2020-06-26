const express = require("express");
const router = new express.Router();
const createError = require("http-errors");
const { auth, authRole } = require("../../middleware/auth");
const Client = require("../../models/client");
const Day = require("../../models/day");

// router.post("/api/addExercises", auth, authRole(3001), (req, res, next) => {
//   try {
//     const day = new Day(req.body);
//   } catch (error) {
//     next(createError(400, error));
//   }
// });
