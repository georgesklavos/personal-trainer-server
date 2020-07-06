const mongoose = require("mongoose");

const langObject = {
  name: {
    type: String,
    required: true,
  },
  titleAdmin: {
    type: String,
    required: true,
  },
  titleTrainer: {
    type: String,
    required: true,
  },
  titleClient: {
    type: String,
    required: true,
  },
  months: [
    {
      type: String,
      required: true,
    },
  ],
  settings: {
    title: {
      type: String,
      required: true,
    },
    system: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    logout: {
      type: String,
      required: true,
    },
    canVerifyPayments: {
      type: String,
      required: true,
    },
  },
  admin: {
    addTrainer: {
      type: String,
      required: true,
    },
    addClient: {
      type: String,
      required: true,
    },
  },
  addAndEditTrainer: {
    loadingTextAdd: {
      type: String,
      required: true,
    },
    loadingTextEdit: {
      type: String,
      required: true,
    },
    titleAdd: {
      type: String,
      required: true,
    },
    titleEdit: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    active: {
      type: String,
      required: true,
    },
    canVerifyPayments: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    clients: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    close: {
      type: String,
      required: true,
    },
    create: {
      type: String,
      required: true,
    },
    save: {
      type: String,
      required: true,
    },
  },
  addAndEditClient: {
    loadingTextAdd: {
      type: String,
      required: true,
    },
    loadingTextEdit: {
      type: String,
      required: true,
    },
    titleAdd: {
      type: String,
      required: true,
    },
    titleEdit: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    trainer: {
      type: String,
      required: true,
    },
    active: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    lastWeight: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    startWeekAt: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    close: {
      type: String,
      required: true,
    },
    create: {
      type: String,
      required: true,
    },
    save: {
      type: String,
      required: true,
    },
  },
  clientInformation: {
    title: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    lastWeight: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
  },
  addDayData: {
    exercises: {
      title: {
        type: String,
        required: true,
      },
      exercisesFor: {
        type: String,
        required: true,
      },
      exerciseMode: {
        type: String,
        required: true,
      },
      warmUp: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
      delete: {
        type: String,
        required: true,
      },
      workout: {
        type: String,
        required: true,
      },
      coolUp: {
        type: String,
        required: true,
      },
      addExercise: {
        type: String,
        required: true,
      },
    },
    macros: {
      title: {
        type: String,
        required: true,
      },
      day: {
        type: String,
        required: true,
      },
      proteins: {
        type: String,
        required: true,
      },
      carbs: {
        type: String,
        required: true,
      },
      fats: {
        type: String,
        required: true,
      },
      calories: {
        type: String,
        required: true,
      },
      trainingDay: {
        type: String,
        required: true,
      },
      textMacros: {
        type: String,
        required: true,
      },
    },
    close: {
      type: String,
      required: true,
    },
    save: {
      type: String,
      required: true,
    },
  },
  viewDataAndAddClientData: {
    tabs: {
      exercises: {
        type: String,
        required: true,
      },
      macros: {
        type: String,
        required: true,
      },
      steps: {
        type: String,
        required: true,
      },
      weight: {
        type: String,
        required: true,
      },
      payment: {
        type: String,
        required: true,
      },
      comments: {
        type: String,
        required: true,
      },
    },
    exercises: {
      warmUp: {
        type: String,
        required: true,
      },
      workout: {
        type: String,
        required: true,
      },
      coolUp: {
        type: String,
        required: true,
      },
      view: {
        type: String,
        required: true,
      },
      add: {
        type: String,
        required: true,
      },
    },
    macros: {
      proteins: {
        type: String,
        required: true,
      },
      carbohydrates: {
        type: String,
        required: true,
      },
      fats: {
        type: String,
        required: true,
      },
      calories: {
        type: String,
        required: true,
      },
      trainingDay: {
        type: String,
        required: true,
      },
      goal: {
        type: String,
        required: true,
      },
    },
    steps: {
      day: {
        type: String,
        required: true,
      },
      week: {
        type: String,
        required: true,
      },
      month: {
        type: String,
        required: true,
      },
    },
    weight: {
      fat: {
        type: String,
        required: true,
      },
      muscle: {
        type: String,
        required: true,
      },
      bone: {
        type: String,
        required: true,
      },
      notes: {
        type: String,
        required: true,
      },
    },
    payment: {
      type: {
        type: String,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
      verifyPayment: {
        type: String,
        required: true,
      },
    },
    video: {
      exercise: {
        type: String,
        required: true,
      },
    },
    close: {
      type: String,
      required: true,
    },
    save: {
      type: String,
      required: true,
    },
  },
  charts: {
    protein: {
      type: String,
      required: true,
    },
    carbohydrates: {
      type: String,
      required: true,
    },
    fat: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    steps: {
      type: String,
      required: true,
    },
  },
};

var langSchema = new mongoose.Schema({
  en: {
    ...langObject,
  },
  gr: {
    ...langObject,
  },
});

langSchema.methods.toJSON = function () {
  const lang = this;

  const langObject = lang.toObject();

  delete langObject.__v;
  delete langObject._id;

  return langObject;
};

const Language = mongoose.model("Language", langSchema);

module.exports = Language;
