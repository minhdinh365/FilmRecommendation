import mongoose from "mongoose";

const schema = mongoose.Schema({
  adult: {
    type: Boolean,
    trim: true,
  },
  backdrop_path: {
    type: String,
    trim: true,
  },
  genre_ids: {
    type: mongoose.Schema.Types.Mixed,
    trim: true,
  },
  id: {
    type: Number,
    ref: "comments",
    trim: true,
    require: true,
  },
  original_language: {
    type: String,
    trim: true,
  },
  original_title: {
    type: String,
    trim: true,
  },
  overview: {
    type: String,
    trim: true,
  },
  popularity: {
    type: Number,
    trim: true,
  },
  poster_path: {
    type: String,
    trim: true,
  },
  release_date: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  video: {
    type: Boolean,
    trim: true,
  },
  vote_average: {
    type: Number,
    trim: true,
  },
  vote_count: {
    type: Number,
    trim: true,
  },
  revenue: {
    type: Number,
    trim: true,
  },
  video_id: {
    type: String,
    trim: true,
  },
  tagline: {
    type: String,
    trim: true,
  },
  run_time: {
    number: Number,
  },
  budget: {
    number: Number,
  },
});

schema.virtual("cmt", {
  ref: "comments",
  localField: "id",
  foreignField: "id_film",
  justOne: false,
  count: true,
});

export const Film = mongoose.model("filmlists", schema);
