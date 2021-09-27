import mongoose from "mongoose";

const Films = mongoose.Schema({
  id: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  slogan: {
    type: String,
    trim: true,
  },
  evaluate: {
    type: Number,
    trim: true,
  },
  view: {
    type: String,
    trim: true,
  },
  overview: {
    type: String,
    trim: true,
  },
  release_date: {
    type: Date,
    trim: true,
  },
  running_time: {
    type: Number,
    trim: true,
  },
  budget: {
    type: String,
    trim: true,
  },
  revenue: {
    type: String,
    trim: true,
  },
  poster_url: {
    type: String,
    trim: true,
  },
  background: {
    type: String,
    trim: true,
  },
});

export default mongoose.model("films", Films);
