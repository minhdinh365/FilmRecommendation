import mongoose from "mongoose";

const schema = mongoose.Schema(
  {  
    adult: {
      type: Boolean,
    },  
    gender: {
      type: Number,   
    },
    id: {
      type: Number,
      ref: "filmlists",
    }, 
    known_for_department: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
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
    credit_id: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    job: {
      type: String,
      trim: true,
    },     
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { _id: false }
);

export const Film = mongoose.model("crews", schema);
