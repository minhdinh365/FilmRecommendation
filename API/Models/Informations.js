import mongoose from "mongoose";

const Information = mongoose.Schema({
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
    trim: true,
  },
});

export default mongoose.model("information", Information);
