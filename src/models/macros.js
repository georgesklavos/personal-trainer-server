const mongoose = require("mongoose");

const macrosSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  macrosTrainer: {
    1: {
      proteins: {
        type: Number,
        required: true,
        default: 0,
      },
      carbs: {
        type: Number,
        required: true,
        default: 0,
      },
      fats: {
        type: Number,
        required: true,
        default: 0,
      },
      calories: {
        type: Number,
        required: true,
        default: 0,
      },
      trainingDay: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    2: {
      proteins: {
        type: Number,
        required: true,
        default: 0,
      },
      carbs: {
        type: Number,
        required: true,
        default: 0,
      },
      fats: {
        type: Number,
        required: true,
        default: 0,
      },
      calories: {
        type: Number,
        required: true,
        default: 0,
      },
      trainingDay: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    3: {
      proteins: {
        type: Number,
        required: true,
        default: 0,
      },
      carbs: {
        type: Number,
        required: true,
        default: 0,
      },
      fats: {
        type: Number,
        required: true,
        default: 0,
      },
      calories: {
        type: Number,
        required: true,
        default: 0,
      },
      trainingDay: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    4: {
      proteins: {
        type: Number,
        required: true,
        default: 0,
      },
      carbs: {
        type: Number,
        required: true,
        default: 0,
      },
      fats: {
        type: Number,
        required: true,
        default: 0,
      },
      calories: {
        type: Number,
        required: true,
        default: 0,
      },
      trainingDay: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    5: {
      proteins: {
        type: Number,
        required: true,
        default: 0,
      },
      carbs: {
        type: Number,
        required: true,
        default: 0,
      },
      fats: {
        type: Number,
        required: true,
        default: 0,
      },
      calories: {
        type: Number,
        required: true,
        default: 0,
      },
      trainingDay: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    6: {
      proteins: {
        type: Number,
        required: true,
        default: 0,
      },
      carbs: {
        type: Number,
        required: true,
        default: 0,
      },
      fats: {
        type: Number,
        required: true,
        default: 0,
      },
      calories: {
        type: Number,
        required: true,
        default: 0,
      },
      trainingDay: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    7: {
      proteins: {
        type: Number,
        required: true,
        default: 0,
      },
      carbs: {
        type: Number,
        required: true,
        default: 0,
      },
      fats: {
        type: Number,
        required: true,
        default: 0,
      },
      calories: {
        type: Number,
        required: true,
        default: 0,
      },
      trainingDay: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    systemSaved: {
      type: Number,
      required: true,
    },
  },
  macrosClient: {
    1: {
      proteins: {
        type: Number,
        required: true,
        default: 0,
      },
      carbs: {
        type: Number,
        required: true,
        default: 0,
      },
      fats: {
        type: Number,
        required: true,
        default: 0,
      },
      calories: {
        type: Number,
        required: true,
        default: 0,
      },
      trainingDay: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    2: {
      proteins: {
        type: Number,
        required: true,
        default: 0,
      },
      carbs: {
        type: Number,
        required: true,
        default: 0,
      },
      fats: {
        type: Number,
        required: true,
        default: 0,
      },
      calories: {
        type: Number,
        required: true,
        default: 0,
      },
      trainingDay: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    3: {
      proteins: {
        type: Number,
        required: true,
        default: 0,
      },
      carbs: {
        type: Number,
        required: true,
        default: 0,
      },
      fats: {
        type: Number,
        required: true,
        default: 0,
      },
      calories: {
        type: Number,
        required: true,
        default: 0,
      },
      trainingDay: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    4: {
      proteins: {
        type: Number,
        required: true,
        default: 0,
      },
      carbs: {
        type: Number,
        required: true,
        default: 0,
      },
      fats: {
        type: Number,
        required: true,
        default: 0,
      },
      calories: {
        type: Number,
        required: true,
        default: 0,
      },
      trainingDay: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    5: {
      proteins: {
        type: Number,
        required: true,
        default: 0,
      },
      carbs: {
        type: Number,
        required: true,
        default: 0,
      },
      fats: {
        type: Number,
        required: true,
        default: 0,
      },
      calories: {
        type: Number,
        required: true,
        default: 0,
      },
      trainingDay: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    6: {
      proteins: {
        type: Number,
        required: true,
        default: 0,
      },
      carbs: {
        type: Number,
        required: true,
        default: 0,
      },
      fats: {
        type: Number,
        required: true,
        default: 0,
      },
      calories: {
        type: Number,
        required: true,
        default: 0,
      },
      trainingDay: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    7: {
      proteins: {
        type: Number,
        required: true,
        default: 0,
      },
      carbs: {
        type: Number,
        required: true,
        default: 0,
      },
      fats: {
        type: Number,
        required: true,
        default: 0,
      },
      calories: {
        type: Number,
        required: true,
        default: 0,
      },
      trainingDay: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    systemSaved: {
      type: Number,
      required: true,
    },
  },
});

const Macros = mongoose.model("Macros", macrosSchema);

module.exports = Macros;
