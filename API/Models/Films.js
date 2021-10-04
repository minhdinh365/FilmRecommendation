import mongoose from "mongoose";

const Films = mongoose.Schema({
  adult: { type: Boolean },
  backdrop_path: {
    type: String,
    trim: true,
  },
  genre_ids: {
    type: mongoose.Schema.Types.Array,
    trim: true,
  },
  id: {
    type: Number,
    trim: true,
  },
  original_language: {
    type: Number,
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
    type: mongoose.Schema.Types.Mixed,
    trim: true,
  },
  poster_path: {
    type: Number,
    trim: true,
  },
  release_date: {
    type: String,
    trim: true,
  },
  title: {
    type: Boolean,
    trim: true,
  },
  video: {
    type: String,
    trim: true,
  },
  vote_average: {
    type: mongoose.Schema.Types.Mixed,
    trim: true,
  },
  vote_count: {
    type: Number,
    trim: true,
  },
});

export default mongoose.model("filmlists", Films);
