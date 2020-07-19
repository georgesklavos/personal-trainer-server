const { server } = require("./app");
const port = process.env.PORT || 3000;
const logger = require("./middleware/logger");

server.listen(port, () => {
  logger.info(`Server is up on port ${port}`);
});
