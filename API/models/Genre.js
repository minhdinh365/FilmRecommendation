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
  }
},
{ 
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
}, );

schema.virtual("film", {
  ref: "genre",
  localField: "id",
  foreignField: "genre_ids.id",
  justOne: true,
});

export const Genre = mongoose.model("genre", schema);