import mongoose from "mongoose";

const Comments = mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      require: true,
      trim: true,
    },
    id_film: {
      type: String,
      ref: "films",
      trim: true,
    },
    id_info: {
      type: String,
      ref: "information",
      trim: true,
    },
    evaluate: {
      type: Number,
      trim: true,
    },
    contents: {
      type: String,
      trim: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

Comments.virtual("film", {
  ref: "films",
  localField: "id_film",
  foreignField: "id",
  justOne: true,
});
Comments.virtual("info", {
  ref: "information",
  localField: "id_info",
  foreignField: "username",
  justOne: true,
});
export default mongoose.model("comments", Comments);
