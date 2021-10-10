import { Comment } from "../models/Comment.js";

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ id_film: Number(req.query.id) })
      .populate("film")
      .populate("info");
    if (comments.length != 0) {
      res.status(200).json(comments);
    } else {
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const postComment = (req, res) => {
  const cmt = new Comment(req.body.comment);
  cmt.save();
  console.log("Da tao cmt");
};
