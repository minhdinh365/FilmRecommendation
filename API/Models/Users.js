import mongoose from "mongoose";

const User = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true,
    trim: true,
  },
  role: {
    type: Number,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
});

export default mongoose.model("accounts", User);
