const mongoose = require("mongoose");
const logger = require("../middleware/logger");

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (!err) {
      logger.info("MongoDB has connected successfully.");
    } else {
      logger.error("MongoDB failed to connect");
    }
  }
);
