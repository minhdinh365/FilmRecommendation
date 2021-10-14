import mongoose from "mongoose";

const schema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  full_name: {
    type: String,
    require: true,
    trim: true,
  },
});

export const Information = mongoose.model("information", schema);
