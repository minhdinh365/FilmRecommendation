import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      ref: "information",
      ref: "comments",
      require: true,
      trim: true,
    },
    role: {
      type: Number,
      trim: true,
      require: true,
    },
    email: {
      type: String,
      trim: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


schema.virtual("info", {
  ref: "information",
  localField: "username",
  foreignField: "username",
  justOne: true,
});

schema.virtual("cmt", {
  ref: "comments",
  localField: "username",
  foreignField: "id_info",
  justOne: false,
  count: true,
});

export const Account = mongoose.model("accounts", schema);