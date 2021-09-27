import Comments from "../Models/Comments.js";

export const getComments = async (req, res) => {
  try {
    const comments = await Comments.find({ id_film: req.query.id })
      .populate("film")
      .populate("info");

    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ err });
  }
};
