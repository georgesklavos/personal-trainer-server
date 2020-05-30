const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB has connected successfully.");
    } else {
      console.log("MongoDB failed to connect");
    }
  }
);
