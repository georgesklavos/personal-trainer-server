const express = require("express");
require("./db/mongoose");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");
const logger = require("./middleware/logger");
const { rateLimiter } = require("./middleware/rateLimiter");
const ownerRouters = require("./routers/owner/signUp");
const loginRouter = require("./routers/mutual/login");
const listsRouters = require("./routers/owner/usersLists");
const helperTablesUploadRouters = require("./routers/admin/helperTables");
const helperTablesGetRouters = require("./routers/mutual/helperTables");
const logoutRouter = require("./routers/mutual/logout");
const clientRouterFromTrainer = require("./routers/trainer/clients");
const updateRouters = require("./routers/mutual/update");
const userData = require("./routers/mutual/userData");
const daysRouterOwnerAndTrainer = require("./routers/owner-trainer/days");
const daysRouterClient = require("./routers/client/days");
const daysRouterTrainer = require("./routers/trainer/days");
const langRouterOwner = require("./routers/admin/lang");
const langRouterMutual = require("./routers/mutual/lang");
const howYouFeelRouterClient = require("./routers/client/howYouFeel");
const howYouFeelRouterOwnerTrainer = require("./routers/owner-trainer/howYouFeel");
const clientCharts = require("./routers/client/charts");
const trainerOwnerCharts = require("./routers/owner-trainer/charts");
const trainerOwnerVerifyPayment = require("./routers/owner-trainer/payment");
const clientPayment = require("./routers/client/payment");
const adminOwners = require("./routers/admin/owners");
const usersOwnerTrainer = require("./routers/owner-trainer/users");

const app = express();
const server = http.createServer(app);
let io = socketio(server);

app.use(function (req, res, next) {
  logger.info(`${req.method} - ${req.originalUrl} - ${req.ip}`);
  next();
});

app.use(express.json());
app.use(ownerRouters);
app.use(loginRouter);
app.use(listsRouters);
app.use(helperTablesUploadRouters);
app.use(helperTablesGetRouters);
app.use(logoutRouter);
app.use(clientRouterFromTrainer);
app.use(updateRouters);
app.use(userData);
app.use(daysRouterOwnerAndTrainer);
app.use(daysRouterClient);
app.use(daysRouterTrainer);
app.use(langRouterOwner);
app.use(langRouterMutual);
app.use(howYouFeelRouterClient);
app.use(howYouFeelRouterOwnerTrainer);
app.use(clientCharts);
app.use(trainerOwnerCharts);
app.use(trainerOwnerVerifyPayment);
app.use(clientPayment);
app.use(adminOwners);
app.use(usersOwnerTrainer);

if (process.env.NODE_ENV === "production") {
  // Static folder
  console.log("prod");
  app.use(express.static(path.join(__dirname, "/../public/")));
  // Web Socket
  io.origins();

  // Handle SPA

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "/../public/index.html"));
  });

  // limit api calls
  // app.use(rateLimiter);
} else {
  io.origins("http://localhost:8080");
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  //logger.error(`${err.message} and the status of the error ${err.status}`);
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );
  res.json({
    error: err.message,
  });
});

app.use("*", function (req, res) {
  logger.error("The url is not valid");
  res.status(404).send({ error: "The url is not valid" });
});

module.exports = { server };
