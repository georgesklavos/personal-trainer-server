const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Trainer = require("../models/trainer");
const Client = require("../models/client");
const _ = require("lodash");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Please authenticate");
    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error });
  }
};

// const auth = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization").replace("Bearer ", "");
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findOne({
//       _id: decoded._id,
//       "tokens.token": token,
//     });

//     let data = {};

//     if (!user) {
//       throw new Error("Please authenticate");
//     }

//     if (user.role == 3000) {
//       data = user;
//     } else if (user.role == 3001) {
//       let trainer = await Trainer({ user: user._id });

//       data = _.merge(user, trainer);
//     } else if (user.role == 3002) {
//       let client = await Client({ user: user._id });

//       data = _.merge(user, client);
//     }

//     req.token = token;
//     req.user = data;
//     console.log(req.user);

//     next();
//   } catch (error) {
//     res.status(401).send({ error });
//   }
// };

const authRole = (role) => {
  return (req, res, next) => {
    if (req.user.role != role) {
      return res.status(401).send("Not allowed");
    }
    next();
  };
};

const authAdminTrainer = (role1, role2) => {
  return (req, res, next) => {
    if (req.user.role != role1 && req.user.role != role2) {
      return res.status(401).send("Not allowed");
    }
    next();
  };
};

module.exports = {
  auth,
  authRole,
  authAdminTrainer,
};
