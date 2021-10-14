import mongoose from "mongoose";

const schema = mongoose.Schema({
  username: {
    type: String,
    ref: "accounts",
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
},
{ 
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
}, );

schema.virtual("user", {
  ref: "accounts",
  localField: "username",
  foreignField: "username",
  justOne: true,
});

export const Information = mongoose.model("information", schema);