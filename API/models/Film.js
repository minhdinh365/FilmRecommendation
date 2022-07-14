import mongoose from "mongoose";
import mongoose_fuzzy_searching from "mongoose-fuzzy-searching";

const schema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.Array,
      trim: true,
    },
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
      ref: "recommendations",
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
    },
    vote_count: {
      type: Number,
    },
    revenue: {
      type: Number,
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
      type: Number,
    },
    budget: {
      type: Number,
    },
    crew: {
      type: mongoose.Schema.Types.Mixed,
      trim: true,
    },
    cast: {
      type: mongoose.Schema.Types.Mixed,
      trim: true,
    },
    keywords: {
      type: mongoose.Schema.Types.Mixed,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
    },
    imdb_id: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { _id: false }
);

schema.virtual("cmt", {
  ref: "comments",
  localField: "id",
  foreignField: "id_film",
  justOne: false,
  count: true,
});

export const Film = mongoose.model("filmlists", schema);
