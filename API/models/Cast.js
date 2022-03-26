import mongoose from "mongoose";

const schema = mongoose.Schema({
  id: {
    type: Number,
    ref: "film",
    unique: true,
    require: true,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  }, 
  gender: {
    type: Number,   
  },
  original_name: {
      type: String,
      trim: true,
  },
  popularity: {
    type: Number,
    trim: true,
  },
  profile_path: {
    type: String,
    trim: true,
  },
  cast_id: {
    type: Number,
    trim: true,
  },
  character: {
    type: String,
    trim: true,
  }, 
},
{ 
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
}, );

schema.virtual("film", {
  ref: "cast",
  localField: "id",
  foreignField: "cast.id",
  justOne: true,
});

export const Cast = mongoose.model("cast", schema);