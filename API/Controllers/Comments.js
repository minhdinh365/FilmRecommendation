import Comments from "../Models/Comments.js";

export const getComments = async (req, res) => {
  try {
    const comments = await Comments.find({ id_film: Number(req.query.id) })
      .populate("film")
      .populate("info");

    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const postComment = (req, res) => {
  const cmt = new Comments(req.body.comment);
  cmt.save();
  console.log("Da tao cmt");
};
