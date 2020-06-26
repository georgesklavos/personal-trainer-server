const mongoose = require("mongoose");

const valuesSchema = new mongoose.Schema({
  systems: {
    1000: {
      weight: {
        name: {
          en: {
            type: String,
          },
          gr: {
            type: String,
          },
        },
        symbol: String,
        value: Number,
      },
      weightLessThanKilo: {
        name: {
          en: {
            type: String,
          },
          gr: {
            type: String,
          },
        },
        symbol: String,
        value: Number,
      },
      height: {
        name: {
          type: String,
        },
        symbol: String,
        value: Number,
      },
      distance: {
        name: {
          type: String,
        },
        symbol: String,
        value: Number,
      },
    },
    1001: {
      weight: {
        name: {
          type: String,
        },
        symbol: String,
        value: Number,
      },
      weightLessThanKilo: {
        name: {
          en: {
            type: String,
          },
          gr: {
            type: String,
          },
        },
        symbol: String,
        value: Number,
      },
      height: {
        name: {
          type: String,
        },
        symbol: String,
        value: Number,
      },
      distance: {
        name: {
          type: String,
        },
        symbol: String,
        value: Number,
      },
    },
  },
  currency: {
    "2000": {
      name: {
        type: String,
      },
      symbol: String,
      value: Number,
    },
    "2001": {
      name: {
        type: String,
      },
      symbol: String,
      value: Number,
    },
  },
  program: [
    {
      id: Number,
      name: {
        en: {
          type: String,
        },
        gr: {
          type: String,
        },
      },
      _id: false,
    },
  ],
  sex: [
    {
      id: Number,
      name: {
        en: {
          type: String,
          required: true,
        },
        gr: {
          type: String,
          required: true,
        },
      },
      _id: false,
    },
  ],

  level: [
    {
      id: Number,
      name: {
        en: {
          type: String,
        },
        gr: {
          type: String,
        },
      },
      _id: false,
    },
  ],
  target: [
    {
      id: Number,
      name: {
        en: {
          type: String,
        },
        gr: {
          type: String,
        },
      },
      _id: false,
    },
  ],
  paymentType: [
    {
      id: Number,
      name: {
        en: {
          type: String,
        },
        gr: {
          type: String,
        },
      },
      _id: false,
    },
  ],
  exerciseMode: [
    {
      id: Number,
      name: {
        en: {
          type: String,
        },
        gr: {
          type: String,
        },
      },
      _id: false,
    },
  ],
  exerciseOptions: [
    {
      id: Number,
      name: String,
      _id: false,
    },
  ],
  warmUpExercises: [
    {
      id: Number,
      name: {
        en: {
          type: String,
        },
        gr: {
          type: String,
        },
      },
      _id: false,
    },
  ],
  workoutExercises: [
    {
      id: Number,
      name: {
        en: {
          type: String,
        },
        gr: {
          type: String,
        },
      },
      _id: false,
    },
  ],
  coolUpExercises: [
    {
      id: Number,
      name: {
        en: {
          type: String,
        },
        gr: {
          type: String,
        },
      },
      _id: false,
    },
  ],
  stepsDistance: [
    {
      id: Number,
      name: {
        en: {
          type: String,
        },
        gr: {
          type: String,
        },
      },
      _id: false,
    },
  ],
});

const Values = mongoose.model("Values", valuesSchema);

module.exports = Values;
