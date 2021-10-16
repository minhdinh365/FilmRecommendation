import mongoose from "mongoose";
import autoIncrementModelID from "./AutoIncrement.js";

const schema = mongoose.Schema(
  {
    id: {
      type: Number,
      require: true,
      trim: true,
    },
    id_film: {
      type: Number,
      ref: "filmlists",
      trim: true,
    },
    id_info: {
      type: String,
      ref: "information",
      trim: true,
    },
    evaluate: {
      type: Number,
      trim: true,
    },
    contents: {
      type: String,
      trim: true,
    },
    is_reply: {
      type: Number,
    },
    date: {
      type: mongoose.Schema.Types.Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
schema.virtual("film", {
  ref: "filmlists",
  localField: "id_film",
  foreignField: "id",
  justOne: true,
});

schema.virtual("info", {
  ref: "information",
  localField: "id_info",
  foreignField: "username",
  justOne: true,
});

schema.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID("activities", this, next);
});
export const Comment = mongoose.model("comments", schema);
