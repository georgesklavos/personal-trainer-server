const express = require("express");
require("./db/mongoose");
const socketio = require("socket.io");
const http = require("http");
const logger = require("./middleware/logger");
const adminRouters = require("./routers/admin/signUp");
const loginRouter = require("./routers/mutual/login");
const listsRouters = require("./routers/admin/usersLists");
const helperTablesUploadRouters = require("./routers/admin/helperTables");
const helperTablesGetRouters = require("./routers/mutual/helperTables");
const logoutRouter = require("./routers/mutual/logout");
const clientRouterFromTrainer = require("./routers/trainer/clients");
const updateRouters = require("./routers/mutual/update");
const userData = require("./routers/mutual/userData");
const daysRouterAdminAndTrainer = require("./routers/admin-trainer/days");
const daysRouterClient = require("./routers/client/days");
const path = require("path");

const app = express();
const server = http.createServer(app);
let io = socketio(server);

app.use(express.json());
app.use(adminRouters);
app.use(loginRouter);
app.use(listsRouters);
app.use(helperTablesUploadRouters);
app.use(helperTablesGetRouters);
app.use(logoutRouter);
app.use(clientRouterFromTrainer);
app.use(updateRouters);
app.use(userData);
app.use(daysRouterAdminAndTrainer);
app.use(daysRouterClient);

if (process.env.NODE_ENV === "production") {
  // Static folder
  console.log(path.join(__dirname, "/../public/index.html"));
  app.use(express.static(path.join(__dirname, "/../public/")));
  // Web Socket
  io.origins();

  // Handle SPA

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "/../public/index.html"));
  });
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